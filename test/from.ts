import * as assert from 'assert';
import * as fc from 'fast-check';

import {
  pipe,
  take,
  subscribe,
  from,
  fromArray,
  fromPromise,
  Operator
} from '../src/index';

describe('fromArray', () => {
  it('should allow to terminate early', () => {
    let taken = 0;

    pipe(
      fromArray([1, 2, 3, 4, 5, 6, 7, 8]),
      take(2),
      subscribe({
        next: () => {
          taken++;
        }
      })
    );

    assert.strictEqual(taken, 2);
  });

  it('should be called by from()', () => {
    let data = 0;

    pipe(
      from([1, 2, 3, 4, 5]),
      subscribe({
        next: () => {
          data++;
        }
      })
    );

    assert.strictEqual(data, 5);
  });
});

describe('fromPromise', () => {
  it('should emit any value', () => {
    return fc.assert(
      fc.asyncProperty(fc.anything(), async x => {
        let completed = 0;
        let data = 0;

        await new Promise(resolve => {
          pipe(
            fromPromise(Promise.resolve(x)),
            subscribe({
              next: d => {
                assert.strictEqual(d, x);
                data++;
              },
              complete: () => {
                completed++;
                resolve();
              },
              error: e => assert.fail(e)
            })
          );
        }).then(() => {
          assert.strictEqual(completed, 1);
          assert.strictEqual(data, 1);
        });
      })
    );
  });

  it('should be called by from()', done => {
    pipe(
      from(Promise.resolve(0)),
      subscribe({
        next: x => {
          assert.strictEqual(x, 0);
        },
        complete: done
      })
    );
  });

  it('should handle errors', done => {
    pipe(
      from(Promise.reject('someError')),
      subscribe({
        next: () => assert.fail('next was called'),
        error: err => {
          assert.strictEqual(err, 'someError');
          done();
        },
        complete: () => assert.fail('complete was called')
      })
    );
  });

  function unsubscribeEarly(when: (a: any) => boolean): Operator<any, any> {
    return source => (_, sink) => {
      let talkback: any;
      source(0, (t, d) => {
        if (t === 0) talkback = d;
        if (when(t)) {
          talkback(2);
          sink(2);
        }
        sink(t, d);
      });
    };
  }

  it('should not send error if unsubscribed already', done => {
    pipe(
      from(Promise.reject('someError')),
      unsubscribeEarly(t => t === 0),
      subscribe({
        next: () => assert.fail('next was called'),
        error: () => assert.fail('error was called'),
        complete: done
      })
    );
  });

  it('should handle rejection without error', done => {
    pipe(
      from(Promise.reject()),
      subscribe({
        next: () => assert.fail('next was called'),
        error: err => {
          assert.strictEqual(err.message, '');
          done();
        }
      })
    );
  });

  it('should handle early unsubscribe after data', done => {
    pipe(
      from(Promise.resolve(0)),
      unsubscribeEarly(t => t === 1),
      subscribe({
        next: d => {
          assert.strictEqual(d, 0);
          done();
        }
      })
    );
  });

  it('should handle early unsubscribe before data', done => {
    pipe(
      from(Promise.resolve(0)),
      unsubscribeEarly(t => t === 0),
      subscribe({
        next: d => {
          assert.fail();
        },
        complete: done
      })
    );
  });
});
