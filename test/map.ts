import * as assert from 'assert';
import * as fc from 'fast-check';

import { map, fromArray, subscribe, pipe } from '../src/index';

describe('map()', () => {
  it('should behave like Array.map()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), fc.func(fc.anything()), (arr, f) => {
        const oracle = arr.map(x => f(x));

        let res: any[] = [];

        let completed = 0;

        pipe(
          fromArray(arr),
          map(f),
          subscribe({
            next: x => res.push(x),
            complete: () => {
              assert.deepStrictEqual(oracle, res);
              completed++;
            }
          })
        );

        assert.strictEqual(completed, 1);
      })
    );
  });
});
