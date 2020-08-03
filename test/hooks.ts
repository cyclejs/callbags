import * as assert from 'assert';

import {
  uponStart,
  uponEnd,
  makeSubject,
  pipe,
  subscribe,
  of,
  throwError,
  never
} from '../src/index';

describe('hooks', () => {
  it('uponStart should be called when the first listener subscribes', () => {
    const subject = makeSubject<number>();

    subject(1, 0);

    let res: any[] = [];
    let effect = false;
    pipe(
      subject,
      uponStart(() => {
        effect = true;
        assert.deepStrictEqual(res, []);
      }),
      subscribe(
        d => {
          res.push(d);
        },
        e => {
          if (e) assert.fail('should not terminate with an error');
        }
      )
    );

    subject(1, 2);
    subject(1, 3);

    assert.strictEqual(effect, true);
    assert.deepStrictEqual(res, [2, 3]);
  });

  it('uponEnd should be called when the stream terminates normally', () => {
    let effect = false;
    let completed = false;
    pipe(
      of(5),
      uponEnd(() => {
        effect = true;
      }),
      subscribe(
        d => assert.strictEqual(d, 5),
        e => {
          if (e) assert.fail('should not terminate with an error');
          assert.strictEqual(effect, true);
          completed = true;
        }
      )
    );
    assert.strictEqual(completed, true);
  });

  it('uponEnd should be called when the stream terminates with an error', () => {
    let effect = false;
    let completed = false;
    pipe(
      throwError('myError'),
      uponEnd(() => {
        effect = true;
      }),
      subscribe(
        () => assert.fail('should not deliver data'),
        e => {
          assert.strictEqual(e, 'myError');
          assert.strictEqual(effect, true);
          completed = true;
        }
      )
    );
    assert.strictEqual(completed, true);
  });

  it('uponEnd should be called when the stream is disposed', () => {
    let effect = false;
    let completed = false;
    const dispose = pipe(
      never(),
      uponEnd(() => {
        effect = true;
      }),
      subscribe(
        () => assert.fail('should not deliver data'),
        () => {
          assert.strictEqual(effect, true);
          completed = true;
        }
      )
    );
    dispose();
    assert.strictEqual(completed, true);
  });
});
