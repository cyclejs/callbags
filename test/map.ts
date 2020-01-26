import * as assert from 'assert';
import * as fc from 'fast-check';

import { map, fromArray, forEach, pipe } from '../src/index';

describe('map tests', () => {
  describe('oracle tests', () => {
    it('should handle simple *2 function', () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), 0, 100), arr => {
          const f = (x: number) => x * 2;
          const oracle = arr.map(f);

          let res: number[] = [];

          pipe(
            fromArray(arr),
            map(f),
            forEach(x => res.push(x))
          );

          assert.deepStrictEqual(oracle, res);
        })
      );
    });
  });
});
