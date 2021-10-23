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
  fromPromise,
  never,
  makeSubject,
  Producer
} from '../src/index';

describe('combine()', () => {
  it('should combine to the same array', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 1, 100), arr => {
        let result: any;
        let completed = false;
        let numData = 0;

        pipe(
          combine(...arr.map(of)),
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
      combineWith((x, y) => x + y, of(1) as Producer<number>, of(2) as Producer<number>),
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
        of(1) as Producer<number>,
        throwError<number>('myError'),
        of(2) as Producer<number>
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

  it('should not deliver data if not all sources have emitted', () => {
    pipe(
      combine(never(), of(1)),
      subscribe(
        () => assert.fail('should not deliver data'),
        () => assert.fail('should not terminate')
      )
    );
  });

  it('should emit values from the same source in the same order', function() {
    this.timeout(20000);

    const arbitrary = fc
      .array(
        fc.anything().filter(x => typeof x !== 'number' || !isNaN(x)),
        1,
        10
      )
      .filter(arr => new Set(arr).size === arr.length);

    return fc.assert(
      fc.asyncProperty(fc.array(arbitrary, 2, 6), arr => {
        const subjects = arr.map(() => makeSubject());

        arr.forEach((arr2, idx) => {
          let i = 0;
          let id = setInterval(() => {
            subjects[idx](1, arr2[i++]);
            if (i === arr2.length) {
              clearInterval(id);
              subjects[idx](2);
            }
          }, 10);
        });

        return new Promise(resolve => {
          let res: any[] = [];
          pipe(
            combine(...subjects),
            subscribe(
              x => res.push(x),
              () => resolve(res)
            )
          );
        }).then((res: any) => {
          let columns: any[][] = arr.map(() => []);
          for (const row of res) {
            assert.strictEqual(row.length, arr.length);
            for (let i = 0; i < row.length; i++) {
              const col = columns[i];
              if (col.length === 0 || col[col.length - 1] !== row[i]) {
                col.push(row[i]);
              }
            }
          }

          for (let i = 0; i < columns.length; i++) {
            assert.deepStrictEqual(columns[i], arr[i]);
          }
        });
      })
    );
  });
});
