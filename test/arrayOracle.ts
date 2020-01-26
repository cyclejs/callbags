import * as assert from 'assert';
import * as fc from 'fast-check';

import { filter, map, fromArray, subscribe, pipe } from '../src/index';

function oneOf<T>(...args: T[]): fc.Arbitrary<T> {
  return fc.integer(0, args.length - 1).map(i => args[i]);
}

describe('using Array as oracle', () => {
  function mkOracleTest<T, U>(
    fnArbitrary: fc.Arbitrary<(t: T) => U>,
    arg: fc.Arbitrary<T>,
    sut: any,
    arrayFnName: string
  ) {
    fc.assert(
      fc.property(fc.array(arg), fnArbitrary, (arr: any, f) => {
        const oracle = arr[arrayFnName]((x: any) => f(x));

        let res: any[] = [];
        let completed = 0;

        pipe(
          fromArray(arr),
          sut(f),
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
    mkOracleTest<any, any>(fc.func(fc.anything()), fc.anything(), map, 'map');
  });

  it('filter()', () => {
    const fns = oneOf<(x: number) => boolean>(
      x => x > 0,
      x => x % 2 === 0
    );

    mkOracleTest(fns, fc.integer(), filter, 'filter');
  });
});
