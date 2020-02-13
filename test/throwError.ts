import * as assert from 'assert';

import { pipe, take, throwError, subscribe } from '../src/index';

describe('throwError', () => {
  it('should give a talkback when subscribed', () => {
    let taken = 0;

    pipe(
      throwError(new Error('foo')),
      take(0),
      subscribe(() => {
        taken++;
      })
    );

    assert.strictEqual(taken, 0);
  });
});
