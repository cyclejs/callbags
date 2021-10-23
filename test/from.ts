import * as assert from 'assert';
import * as fc from 'fast-check';
import { unsubscribeEarly } from './helpers';

import {
  pipe,
  take,
  subscribe,
  from,
  fromArray,
  fromPromise
} from '../src/index';

describe('fromArray', () => {
  it('should allow to terminate early', () => {
    let taken = 0;

    pipe(
      fromArray([1, 2, 3, 4, 5, 6, 7, 8]),
      take(2),
      subscribe(() => {
        taken++;
      })
    );

    assert.strictEqual(taken, 2);
  });

  it('should be called by from()', () => {
    let data = 0;

    pipe(
      from([1, 2, 3, 4, 5]),
      subscribe(() => {
        data++;
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
            subscribe(
              d => {
                assert.strictEqual(d, x);
                data++;
              },
              e => {
                if (e) assert.fail(e);
                else {
                  completed++;
                  resolve(null);
                }
              }
            )
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
      subscribe(x => {
        assert.strictEqual(x, 0);
      }, done)
    );
  });

  it('should handle errors', done => {
    pipe(
      from(Promise.reject('someError')),
      subscribe(
        () => assert.fail('next was called'),
        err => {
          if (err) {
            assert.strictEqual(err, 'someError');
            done();
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );
  });

  it('should not send error if unsubscribed already', done => {
    pipe(
      from(Promise.reject('someError')),
      unsubscribeEarly(t => t === 0),
      subscribe(
        () => assert.fail('next was called'),
        e => {
          if (e) assert.fail('error was called');
          else done();
        }
      )
    );
  });

  it('should handle rejection without error', done => {
    pipe(
      from(Promise.reject()),
      subscribe(
        () => assert.fail('next was called'),
        err => {
          assert.strictEqual(err.message, '');
          done();
        }
      )
    );
  });

  it('should handle early unsubscribe after data', done => {
    pipe(
      from(Promise.resolve(0)),
      unsubscribeEarly(t => t === 1),
      subscribe(d => {
        assert.strictEqual(d, 0);
        done();
      })
    );
  });

  it('should handle early unsubscribe before data', done => {
    pipe(
      from(Promise.resolve(0)),
      unsubscribeEarly(t => t === 0),
      subscribe(() => assert.fail(), done)
    );
  });
});
