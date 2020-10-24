import * as assert from 'assert';
import { unsubscribeEarly } from './helpers';

import {
  pipe,
  flatten,
  map,
  of,
  fromPromise,
  subscribe,
  take,
  fromArray,
  throwError,
  never
} from '../src/index';

describe('flatten', () => {
  it('should allow to unsubscribe before delivering data', () => {
    let completed = false;

    pipe(
      fromArray([1, 2, 3, 4, 5].map(of)),
      flatten,
      unsubscribeEarly(t => t === 0),
      subscribe(
        () => assert.fail('should not deliver data'),
        err => {
          if (err) assert.fail('should not call error');
          else completed = true;
        }
      )
    );

    assert.strictEqual(completed, true);
  });

  it('should allow inner streams to complete after the outer stream', done => {
    let numData = 0;
    pipe(
      of(fromPromise(Promise.resolve(0))),
      flatten,
      subscribe(
        data => {
          assert.strictEqual(data, 0);
          numData++;
        },
        err => {
          if (err) assert.fail('should not call error');
          else {
            assert.strictEqual(numData, 1);
            done();
          }
        }
      )
    );
  });

  it('should allow the inner stream to error', () => {
    let numError = 0;

    pipe(
      of(throwError('myError')),
      flatten,
      subscribe(
        () => assert.fail('should not deliver data'),
        err => {
          if (err) {
            assert.strictEqual(err, 'myError');
            numError++;
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );

    assert.strictEqual(numError, 1);
  });

  it('should allow the outer stream to error', () => {
    let numError = 0;

    pipe(
      throwError('myError'),
      flatten,
      subscribe(
        () => assert.fail('should not deliver data'),
        err => {
          if (err) {
            assert.strictEqual(err, 'myError');
            numError++;
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );
    assert.strictEqual(numError, 1);
  });

  it('should complete unfinished inner stream when new inner stream is received', done => {
    let numData = 0;
    pipe(
      fromArray([fromPromise(Promise.resolve(0)), of(1)]),
      flatten,
      subscribe(
        data => {
          assert.strictEqual(data, 1);
          numData++;
        },
        err => {
          if (err) assert.fail('should not call error');
          else {
            assert.strictEqual(numData, 1);
            done();
          }
        }
      )
    );
  });

  it('should complete inner stream when outer errors', done => {
    const testSource = (_: number, sink: any) => {
      sink(0, () => {});
      sink(1, fromPromise(Promise.resolve(0)));
      sink(2, 'myError');
    };

    pipe(
      testSource,
      flatten,
      subscribe(
        () => assert.fail('should not deliver data'),
        err => {
          if (err) {
            assert.strictEqual(err, 'myError');
            done();
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );
  });

  it('should unsubscribe inner stream when sink unsubscribes', () => {
    let taken = 0;

    pipe(
      of(1),
      map(() => fromArray([1, 2, 3, 4])),
      flatten,
      take(2),
      subscribe(() => taken++)
    );

    assert.strictEqual(taken, 2);
  });

  it('should not unsubscribe from completed outer source when waiting for inner completion', () => {
    let outerDisposed = false;
    const testSource = (_: number, sink: any) => {
      sink(0, (t: number) => {
        if (t === 2) outerDisposed = true;
      });
      sink(1, true);
      sink(2);
    };

    const dispose = pipe(
      testSource,
      map(never),
      flatten,
      subscribe(() => {})
    );

    dispose();
    assert.strictEqual(outerDisposed, false);
  });
});
