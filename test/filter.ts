import * as assert from 'assert';
import * as fc from 'fast-check';

import { filter, fromArray, subscribe, pipe } from '../src/index';

describe('filter()', () => {
  it('should behave like Array.filter()', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()),
        fc.compareBooleanFunc(),
        (arr, f) => {
          const oracle = arr.filter(x => f(x, 0));

          let res: any[] = [];

          let completed = 0;

          pipe(
            fromArray(arr),
            filter(x => f(x, 0)),
            subscribe({
              next: x => res.push(x),
              complete: () => {
                assert.deepStrictEqual(oracle, res);
                completed++;
              }
            })
          );

          assert.strictEqual(completed, 1);
        }
      )
    );
  });
});
