import * as assert from 'assert';

import { pipe, of, makeSubject, take } from '../src/index';

describe('take', () => {
  it('should not deliver more items after taking sufficient amount', () => {
    const subject = makeSubject<number>();
    let taken = 0;

    pipe(subject, take(1), source => {
      source(0, (t, d) => {
        if (t === 1) {
          taken++;
          subject(1, ++d);
        }
      });
      return () => {};
    });

    subject(1, 1);

    assert.strictEqual(taken, 1);
  });

  it('should not be notified about completion after synchronous disposal upon receiving last item', () => {
    pipe(of('foo'), take(1), source => {
      let talkback: any;
      source(0, (t, d) => {
        if (t === 0) {
          talkback = d;
        } else if (t === 1) {
          talkback(2);
        } else if (t === 2) {
          assert.fail('should not deliver completion');
        }
      });
      return () => {};
    });
  });
});
