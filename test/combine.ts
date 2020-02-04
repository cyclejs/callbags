import * as assert from 'assert';
import * as fc from 'fast-check';

import { pipe, subscribe, combine, of } from '../src/index';

describe('combine()', () => {
  it('should combine to the same array', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), 1, 100), arr => {
        let result: any;
        let completed = false;

        pipe(
          combine(...arr.map(x => of(x))),
          subscribe({
            next: data => {
              result = data;
            },
            error: () => assert.fail('should not call error'),
            complete: () => {
              completed = true;
            }
          })
        );

        assert.strictEqual(completed, true);
        assert.deepStrictEqual(result, arr);
      })
    );
  });
});
