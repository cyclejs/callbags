import * as assert from 'assert';

import { interval } from 'callbag-basics';
import { subscribe, of, throwError, pipe, Producer } from '../src/index';

describe('subscribe tests', () => {
  it('should call onEnd() with an error argument when it fails', () => {
    let errored = false;

    pipe(
      throwError('someError'),
      subscribe(
        () => assert.fail('should not receive data'),
        err => {
          assert.strictEqual(err, 'someError');
          errored = true;
        }
      )
    );

    assert.strictEqual(errored, true);
  });

  it('should return a dispose() function', done => {
    const FIRST = 40; // when dispose is called
    const SECOND = 80; // when source *would* deliver data
    const THIRD = 120; // when final asserts are done
    let disposed = 0;

    const dispose = pipe(
      interval(SECOND) as Producer<number>,
      subscribe(
        () => assert.fail('data should not be delivered after dispose'),
        () => assert.fail('should not complete after dispose'),
        () => disposed++
      )
    );
    assert.strictEqual(typeof dispose, 'function');
    setTimeout(dispose, FIRST);
    setTimeout(() => {
      assert.strictEqual(disposed, 1);
      done();
    }, THIRD);
  });

  describe('dispose()', () => {
    it('works even if it is called too early', done => {
      const FIRST = 50; // when dispose is called
      const SECOND = 100; // when source starts listening to sink
      const THIRD = 200; // when source *would* deliver data
      const FOURTH = 300; // when final asserts are done

      let talkbackCalled = false;
      const source = (_: 0, sink: any) => {
        setTimeout(() => {
          sink(0, () => {
            talkbackCalled = true;
            clearTimeout(timeout);
          });
        }, SECOND);
        let timeout = setTimeout(() => {
          sink(1, 42);
        }, THIRD);
      };

      let disposed = 0;
      const dispose = pipe(
        source,
        subscribe(
          () => assert.fail('data should not be delivered after dispose'),
          () => assert.fail('should not complete after dispose'),
          () => disposed++
        )
      );
      assert.strictEqual(typeof dispose, 'function');
      setTimeout(dispose, FIRST);
      setTimeout(() => {
        assert.strictEqual(talkbackCalled, true);
        assert.strictEqual(disposed, 1);
        done();
      }, FOURTH);
    });

    it('works without complete() function', done => {
      const FIRST = 50; // when dispose is called
      const SECOND = 100; // when source starts listening to sink
      const THIRD = 200; // when source *would* deliver data
      const FOURTH = 300; // when final asserts are done

      let talkbackCalled = false;
      const source = (_: 0, sink: any) => {
        setTimeout(() => {
          sink(0, () => {
            talkbackCalled = true;
            clearTimeout(timeout);
          });
        }, SECOND);
        let timeout = setTimeout(() => {
          sink(1, 42);
        }, THIRD);
      };

      const dispose = pipe(
        source,
        subscribe(() =>
          assert.fail('data should not be delivered after dispose')
        )
      );
      assert.strictEqual(typeof dispose, 'function');
      setTimeout(dispose, FIRST);
      setTimeout(() => {
        assert.strictEqual(talkbackCalled, true);
        done();
      }, FOURTH);
    });
  });

  it('should work without onEnd() function', () => {
    pipe(
      of(0),
      subscribe(d => assert.strictEqual(d, 0))
    );
  });

  it('should work without onEnd() function when it fails', () => {
    pipe(
      throwError('someError'),
      subscribe(() => assert.fail('should not receive data'))
    );
  });
});
