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

  it('source should be able to complete before sample', done => {
    pipe(
      of(0),
      sample(fromPromise(Promise.resolve(1))),
      subscribe(
        () => assert.fail('should not deliver data'),
        e => {
          if (e) assert.fail('should not call error');
          else done();
        }
      )
    );
  });

  it('should allow to sample to error after subscribing to source', done => {
    pipe(
      fromPromise(Promise.resolve(0)),
      sample(fromPromise(Promise.reject('myError'))),
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
});
