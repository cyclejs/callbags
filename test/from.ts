import * as assert from 'assert';

import {
  pipe,
  take,
  subscribe,
  from,
  fromArray,
  fromPromise
} from '../src/index';

describe('fromArray', () => {
  it('should allow to terminate early', () => {
    let taken = 0;

    pipe(
      fromArray([1, 2, 3, 4, 5, 6, 7, 8]),
      take(2),
      subscribe({
        next: () => {
          taken++;
        }
      })
    );

    assert.strictEqual(taken, 2);
  });
});
