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
});
