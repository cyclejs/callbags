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
      fc.property(fc.array(fc.anything(), 1, 100), arr => {
        let result: any;
        let completed = false;
        let numData = 0;

        pipe(
          combine(...arr.map(x => of(x))),
          subscribe(
            data => {
              result = data;
              numData++;
            },
            err => {
              if (err) assert.fail('should not call error');
              else completed = true;
            }
          )
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

  it('should allow sources to error', () => {
    let numError = 0;
    pipe(
      combineWith(
        (x, y, z) => x * y * z,
        of(1),
        throwError<number>('myError'),
        of(2)
      ),
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

  it('should complete sources on error', () => {
    let numError = 0;
    pipe(
      combine(fromPromise(Promise.resolve(1)), throwError('myError')),
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
});
