import * as assert from 'assert';

import {
  pipe,
  subscribe,
  of,
  fromPromise,
  throwError,
  sampleCombine,
  sample
} from '../src/index';

describe('sample', () => {
  it('sampleCombine should allow to emit errors', () => {
    let numError = 0;
    pipe(
      of(1),
      sampleCombine(of(2), of(3), throwError('myError')),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: err => {
          assert.strictEqual(err, 'myError'), numError++;
        },
        complete: () => assert.fail('should not complete')
      })
    );

    assert.strictEqual(numError, 1);
  });

  it('source should be able to complete before sample', done => {
    pipe(
      of(0),
      sample(fromPromise(Promise.resolve(1))),
      subscribe({
        next: () => assert.fail('should not deliver data'),
        error: () => assert.fail('should not call error'),
        complete: done
      })
    );
  });

  it('should allow to sample to error after subscribing to source', done => {
    pipe(
      fromPromise(Promise.resolve(0)),
      sample(fromPromise(Promise.reject('myError'))),
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
