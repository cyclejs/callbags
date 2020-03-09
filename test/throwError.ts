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

  it('should not notify about error after synchronous disposal', () => {
    let taken = 0;

    pipe(throwError(new Error('foo')), source => {
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
