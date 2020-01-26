import * as assert from 'assert';

import { subscribe, of, throwError, pipe } from '../src/index';

describe('subscribe tests', () => {
  it('should call observer.error() on error', () => {
    let errored = false;

    pipe(
      throwError('someError'),
      subscribe({
        next: () => assert.fail('should not receive data'),
        complete: () => assert.fail('should not complete'),
        error: err => {
          assert.strictEqual(err, 'someError');
          errored = true;
        }
      })
    );

    assert.strictEqual(errored, true);
  });

  it('should work without complete() function', () => {
    pipe(of(0), subscribe({ next: d => assert.strictEqual(d, 0) }));
  });

  it('should work without error() function', () => {
    pipe(
      throwError('someError'),
      subscribe({ next: () => assert.fail('should not receive data') })
    );
  });
});
