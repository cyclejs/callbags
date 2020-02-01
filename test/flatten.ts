import * as assert from 'assert';
import { unsubscribeEarly } from './helpers';

import {
  pipe,
  flatten,
  of,
  fromPromise,
  subscribe,
  throwError
} from '../src/index';

describe('flatten()', () => {
  it('should allow to unsubscribe before delivering data', () => {
    let completed = false;

    pipe(
      of([1, 2, 3, 4, 5].map(of)),
      flatten(),
      unsubscribeEarly(t => t === 0),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: () => assert.fail('should not call error'),
        complete: () => {
          completed = true;
        }
      })
    );

    assert.strictEqual(completed, true);
  });

  it('should allow inner streams to complete after the outer stream', done => {
    let numData = 0;
    pipe(
      of(fromPromise(Promise.resolve(0))),
      flatten(),
      subscribe({
        next: data => {
          assert.strictEqual(data, 0);
          numData++;
        },
        error: () => assert.fail('should not call error'),
        complete: () => {
          assert.strictEqual(numData, 1);
          done();
        }
      })
    );
  });

  it('should allow the inner stream to error', () => {
    let numError = 0;

    pipe(
      of(throwError('myError')),
      flatten(),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: err => {
          assert.strictEqual(err, 'myError');
          numError++;
        },
        complete: () => assert.fail('should not complete')
      })
    );

    assert.strictEqual(numError, 1);
  });

  it('should allow the outer stream to error', () => {
    let numError = 0;

    pipe(
      throwError('myError'),
      flatten(),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: err => {
          assert.strictEqual(err, 'myError');
          numError++;
        },
        complete: () => assert.fail('should not complete')
      })
    );
    assert.strictEqual(numError, 1);
  });

  it('should complete unfinished inner stream when new inner stream is received', done => {
    let numData = 0;
    pipe(
      of(fromPromise(Promise.resolve(0)), of(1)),
      flatten(),
      subscribe({
        next: data => {
          assert.strictEqual(data, 1);
          numData++;
        },
        error: () => assert.fail('should not call error'),
        complete: () => {
          assert.strictEqual(numData, 1);
          done();
        }
      })
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
      flatten(),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: err => {
          assert.strictEqual(err, 'myError');
          done();
        },
        complete: () => assert.fail('should not complete')
      })
    );
  });
});
