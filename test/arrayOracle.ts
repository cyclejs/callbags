import * as assert from 'assert';
import * as fc from 'fast-check';

import { map, fromArray, subscribe, pipe } from '../src/index';

describe('using Array as oracle', () => {
  function mkOracleTest<T extends (...args: any[]) => any>(
    fnArbitrary: fc.Arbitrary<T>,
    wrapFn: (f: T) => (arg: any) => any = f => x => f(x)
  ) {
    fc.assert(
      fc.property(fc.array(fc.anything()), fnArbitrary, (arr, f) => {
        const oracle = arr.map(wrapFn(f));

        let res: any[] = [];

        let completed = 0;

        pipe(
          fromArray(arr),
          map(wrapFn(f)),
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
  }

  it('map()', () => {
    mkOracleTest(fc.func(fc.anything()));
  });

  it('filter()', () => {
    mkOracleTest(fc.compareBooleanFunc(), f => x => f(x, 0));
  });
});
