import * as assert from 'assert';

import { pipe, makeReplaySubject, subscribe } from '../src/index';

describe('makeReplaySubject', () => {
  it('should deliver data if subscribed afterwards', () => {
    const subject = makeReplaySubject<number>();

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

    assert.deepStrictEqual(res, [1, 2, 3, 4, 5, 6]);
  });

  it('should deliver data to second listener after buffer is deleted', () => {
    const subject = makeReplaySubject<number>(2);

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

    let res2: any[] = [];
    pipe(
      subject,
      subscribe(
        d => {
          res2.push(d);
        },
        e => {
          if (e) assert.fail('should not terminate with error');
        }
      )
    );

    // buffer is deleted here

    subject(1, 6);

    let res3: any[] = [];
    pipe(
      subject,
      subscribe(
        d => {
          res3.push(d);
        },
        e => {
          if (e) assert.fail('should not terminate with error');
        }
      )
    );

    subject(1, 7);

    assert.deepStrictEqual(res, [1, 2, 3, 4, 5, 6, 7]);
    assert.deepStrictEqual(res2, [1, 2, 3, 4, 5, 6, 7]);
    assert.deepStrictEqual(res3, [7]);
  });
});
