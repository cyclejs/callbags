import * as assert from 'assert';
import * as fc from 'fast-check';

import {
  filter,
  map,
  fromArray,
  of,
  subscribe,
  pipe,
  scan,
  take,
  first,
  last,
  skip,
  flatten,
  sampleWith,
  sampleCombine,
  sample,
  makeSubject
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
          subscribe(
            x => res.push(x),
            e => {
              if (e) assert.fail(e);
              assert.deepStrictEqual(res, oracle);
              completed++;
            }
          )
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
            subscribe(
              data => res.push(data),
              err => {
                if (err) assert.fail('should not terminate with error');
                else completed = true;
              }
            )
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
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('take()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), fc.nat(150), (arr, n) => {
        const oracle = arr.slice(0, n);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          take(n),
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('first()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), arr => {
        const oracle = arr.slice(0, 1);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          first(),
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('skip()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), fc.nat(150), (arr, n) => {
        const oracle = arr.slice(n);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          skip(n),
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('last()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), arr => {
        const oracle = arr.slice(-1);

        let res: any[] = [];
        let completed = false;
        pipe(
          fromArray(arr),
          last(),
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('flatten()', function() {
    this.timeout(10000);
    fc.assert(
      fc.property(fc.array(fc.array(fc.anything(), 0, 75), 0, 100), arr => {
        const oracle = arr.reduce((acc, curr) => acc.concat(curr), []);

        let completed = false;
        let result: any[] = [];
        pipe(
          fromArray(arr.map(fromArray)),
          flatten,
          subscribe(
            data => result.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(result, oracle);
      })
    );
  });

  it('sampleWith()', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 0, 100), fc.integer(), (arr, n) => {
        const oracle = arr.map(x => x + n);
        let completed = false;

        let res: number[] = [];
        pipe(
          fromArray(arr),
          sampleWith((a, b) => a + b, of<number>(n)),
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, oracle);
      })
    );
  });

  it('sampleCombine()', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), arr => {
        let completed = false;
        let numData = 0;

        let res: any[] = [];
        pipe(
          fromArray(arr.slice(0, 1)),
          sampleCombine(...arr.slice(1).map(x => of(x))),
          subscribe(
            data => {
              numData++;
              res = data;
            },
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        assert.strictEqual(completed, true);
        assert.strictEqual(numData, arr.length > 1 ? 1 : 0);
        assert.deepStrictEqual(res, arr.length > 1 ? arr : []);
      })
    );
  });

  it('sample()', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything(), 0, 100),
        fc.array(fc.anything()),
        (arr, s) => {
          const oracle =
            arr.length === 0 ? [] : s.map(() => arr[arr.length - 1]);
          let completed = false;

          let res: any[] = [];
          pipe(
            fromArray(s),
            sample(fromArray(arr)),
            subscribe(
              data => res.push(data),
              err => {
                if (err) assert.fail('should not terminate with error');
                else completed = true;
              }
            )
          );

          assert.strictEqual(completed, true);
          assert.deepStrictEqual(res, oracle);
        }
      )
    );
  });

  it('makeSubject', () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), 0, 100), arr => {
        const subject = makeSubject<any>();

        let completed = false;
        let res: any[] = [];
        pipe(
          subject,
          subscribe(
            data => res.push(data),
            err => {
              if (err) assert.fail('should not terminate with error');
              else completed = true;
            }
          )
        );

        for (const x of arr) {
          subject(1, x);
        }
        subject(2);

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(res, arr);
      })
    );
  });
});
