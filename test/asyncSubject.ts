import * as assert from 'assert';

import { pipe, makeAsyncSubject, subscribe } from '../src/index';
import { unsubscribeEarly } from './helpers';

describe('makeAsyncSubject', () => {
  it('should deliver data if subscribed afterwards', done => {
    const subject = makeAsyncSubject<number>();

    for (const x of [1, 2, 3, 4, 5]) {
      subject(1, x);
    }

    let res: any[] = [];
    pipe(
      subject,
      subscribe(
        d => {
          res.push(d);
        },
        e => {
          if (e) assert.fail('should not terminate with error');
        }
      )
    );

    subject(1, 6);

    setTimeout(() => {
      assert.deepStrictEqual(res, [1, 2, 3, 4, 5, 6]);
      done();
    }, 10);
  });

  it('should allow to manually terminate the stream', () => {
    const subject = makeAsyncSubject();

    let completed = 0;
    pipe(
      subject,
      subscribe(
        d => {
          assert.strictEqual(d, 5);
        },
        e => {
          if (e) assert.fail('should not terminate with error');
          assert.strictEqual(completed, 1);
          completed++;
        }
      )
    );

    pipe(
      subject,
      unsubscribeEarly(t => t === 0),
      subscribe(
        () => assert.fail('should not deliver data'),
        e => {
          if (e) assert.fail('should not terminate with error');
          assert.strictEqual(completed, 0);
          completed++;
        }
      )
    );

    subject(1, 5);
    subject(2);

    assert.strictEqual(completed, 2);
  });

  it.only('should deliver data that is emitted sync while delivering earlier data', done => {
    const subject = makeAsyncSubject();
    const expected = [0, 1];

    pipe(
      subject,
      subscribe(d => {
        assert.strictEqual(d, expected.shift());
        if (d === 0) {
          subject(1, 1);
        }
      })
    );

    subject(1, 0);

    setTimeout(() => {
      assert.strictEqual(expected.length, 0);
      done();
    }, 10);
  });
});
