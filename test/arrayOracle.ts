import * as assert from 'assert';
import * as fc from 'fast-check';

import {
  filter,
  map,
  fromArray,
  subscribe,
  pipe,
  scan,
  take,
  first,
  last,
  skip,
  flatten
} from '../src/index';

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
      fc.property(fc.array(arg, 0, 100), fnArbitrary, (arr: any, f) => {
        const oracle = arr[arrayFnName]((x: any) => f(x));

        let res: any[] = [];
        let completed = 0;

        pipe(
          fromArray(arr),
          sut(f),
          subscribe({
            next: x => res.push(x),
            complete: () => {
              assert.deepStrictEqual(res, oracle);
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

  it('scan() (with starting value)', () => {
    const fns = oneOf<(x: number, y: number) => number>(
      (x, y) => x + y,
      (x, y) => x * y
    );

    fc.assert(
      fc.property(
        fc.array(fc.integer(), 0, 100),
        fc.integer(),
        fns,
        (arr, x, f) => {
          const oracle = arr.reduce(
            (accs, curr) => accs.concat(f(accs[accs.length - 1], curr) as any),
            [x]
          );

          let res: any[] = [];
          let completed = false;

          pipe(
            fromArray(arr),
            scan(f, x),
            subscribe({
              next: data => res.push(data),
              error: () => assert.fail('should not call error'),
              complete: () => {
                completed = true;
              }
            })
          );

          assert.strictEqual(completed, true);
          assert.deepStrictEqual(res, oracle);
        }
      )
    );
  });

  it('scan() (without starting value)', () => {
    const fns = oneOf<(x: number, y: number) => number>(
      (x, y) => x + y,
      (x, y) => x * y
    );

    fc.assert(
      fc.property(fc.array(fc.integer(), 1, 100), fns, (arr, f) => {
        const oracle = arr
          .slice(1)
          .reduce(
            (accs, curr) => accs.concat(f(accs[accs.length - 1], curr) as any),
            arr.slice(0, 1)
          );

        let res: any[] = [];
        let completed = false;

        pipe(
          fromArray(arr),
          scan(f),
          subscribe({
            next: data => res.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('take()', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 0, 100), fc.nat(150), (arr, n) => {
        const oracle = arr.slice(0, n);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          take(n),
          subscribe({
            next: data => res.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('first()', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 0, 100), arr => {
        const oracle = arr.slice(0, 1);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          first(),
          subscribe({
            next: data => res.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('skip()', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 0, 100), fc.nat(150), (arr, n) => {
        const oracle = arr.slice(n);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          skip(n),
          subscribe({
            next: data => res.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('last()', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 0, 100), arr => {
        const oracle = arr.slice(-1);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          last(),
          subscribe({
            next: data => res.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('flatten()', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.integer(), 0, 100), 0, 100), arr => {
        const oracle = arr.reduce((acc, curr) => acc.concat(curr), []);

        let completed = false;
        let result: any[] = [];
        pipe(
          fromArray(arr.map(fromArray)),
          flatten(),
          subscribe({
            next: data => result.push(data),
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(result, oracle);
      })
    );
  });
});
