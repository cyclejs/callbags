import * as assert from 'assert';
import * as fc from 'fast-check';
import { unsubscribeEarly } from './helpers';

import {
  pipe,
  subscribe,
  combine,
  combineWith,
  of,
  throwError,
  fromPromise
} from '../src/index';

describe('combine()', () => {
  it('should combine to the same array', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 1, 100), arr => {
        let result: any;
        let completed = false;
        let numData = 0;

        pipe(
          combine(...arr.map(x => of(x))),
          subscribe({
            next: data => {
              result = data;
              numData++;
            },
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.strictEqual(numData, 1);
        assert.deepStrictEqual(result, arr);
      })
    );
  });

  it('should allow sources to unsubscribe', () => {
    let completed = false;
    pipe(
      combineWith((x, y) => x + y, of(1), of(2)),
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

  it('should allow sources to error', () => {
    let numError = 0;
    pipe(
      combineWith(
        (x, y, z) => x * y * z,
        of(1),
        throwError<number>('myError'),
        of(2)
      ),
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

  it('should complete sources on error', () => {
    let numError = 0;
    pipe(
      combine(fromPromise(Promise.resolve(1)), throwError('myError')),
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
});
