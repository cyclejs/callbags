import * as assert from 'assert';
import * as fc from 'fast-check';

import {
  startWith,
  fromArray,
  fromPromise,
  subscribe,
  pipe
} from '../src/index';

describe('startWith', () => {
  it('should work for synchronous sources', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), fc.anything(), (arr, x) => {
        let result: any[] = [];

        pipe(
          fromArray(arr),
          startWith(x),
          subscribe(data => {
            result.push(data);
          })
        );

        assert.deepStrictEqual(result, [x].concat(arr));
      })
    );
  });

  it('should work for asynchronous sources', () => {
    return fc.assert(
      fc.asyncProperty(fc.anything(), fc.anything(), async (x, y) => {
        let result: any[] = [];

        const z = await new Promise((resolve: any) =>
          pipe(
            fromPromise(Promise.resolve(x)),
            startWith(y),
            subscribe(data => {
              result.push(data);
            }, resolve)
          )
        );

        assert.strictEqual(typeof z, 'undefined');
        assert.deepStrictEqual(result, [y, x]);
      })
    );
  });

  it('should not deliver value after synchronous disposal', () => {
    let taken = 0;

    pipe(fromPromise(new Promise(() => {})), startWith('foo'), source => {
      source(0, (t, d) => {
        if (t === 0) {
          d(2);
          return;
        }
        taken++;
      });
      return () => {};
    });

    assert.strictEqual(taken, 0);
  });
});
