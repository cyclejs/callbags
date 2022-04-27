import * as assert from 'assert';

import {
  pipe,
  subscribe,
  of,
  uponStart,
  fromArray,
  remember,
  uponEnd,
  merge,
  makeSubject,
  never,
} from '../src/index';

describe('remember tests', () => {
  it('should call hook only once with remember', done => {
    let numHook = 0;
    const of$ = pipe(
      of('some value'),
      uponStart(() => {
        numHook++;
      }),
      remember()
    );

    let listener1Called = false;
    let listener2Called = false;

    pipe(
      of$,
      subscribe(
        x => {
          assert.strictEqual(x, 'some value');
          listener1Called = true;
        },
        err => {
          if (err) done(err);
        }
      )
    );

    pipe(
      of$,
      subscribe(
        x => {
          assert.strictEqual(x, 'some value');
          listener2Called = true;
        },
        err => {
          if (err) done(err);
        }
      )
    );

    setTimeout(() => {
      assert.strictEqual(listener1Called, true, 'listener 1 called');
      assert.strictEqual(listener2Called, true, 'listener 2 called');
      assert.strictEqual(numHook, 1);
      done();
    }, 20);
  });

  it('should call hook only once with remember when shouldUnsubscribe == true', done => {
    let numHook = 0;
    let completed = 0;
    const of$ = pipe(
      merge(of('some value'), never()),
      uponStart(() => {
        numHook++;
      }),
      uponEnd(() => {
        completed++;
      }),
      remember(1, true)
    );

    let listener1Called = false;
    let listener2Called = false;

    const unsubscribe1 = pipe(
      of$,
      subscribe(
        x => {
          assert.strictEqual(x, 'some value');
          listener1Called = true;
        },
        err => {
          if (err) done(err);
        }
      )
    );

    const unsubscribe2 = pipe(
      of$,
      subscribe(
        x => {
          assert.strictEqual(x, 'some value');
          listener2Called = true;
        },
        err => {
          if (err) done(err);
        }
      )
    );

    unsubscribe1();

    setTimeout(() => unsubscribe2(), 10);
    setTimeout(() => {
      assert.strictEqual(listener1Called, true, 'listener 1 called');
      assert.strictEqual(listener2Called, true, 'listener 2 called');
      assert.strictEqual(numHook, 1);
      assert.strictEqual(completed, 1);
      done();
    }, 20);
  });

  it('should synchronously provide last value even after emission', done => {
    const data$ = pipe(fromArray([1, 2, 3]), remember(2));

    let numCalled = [0, 0];
    let expected1 = [1, 2, 3];
    pipe(
      data$,
      subscribe(x => {
        assert.strictEqual(x, expected1.shift());
        numCalled[0]++;
      })
    );

    setTimeout(() => {
      let expected2 = [2, 3];
      pipe(
        data$,
        subscribe(x => {
          assert.strictEqual(x, expected2.shift());
          numCalled[1]++;
        })
      );

      // No setTimeout, emission should be synchronous
      assert.deepStrictEqual(numCalled, [3, 2]);
      done();
    }, 10);
  });

  it('should not unsubscribe from source if all sinks unsubscribe', done => {
    let numCalled = [0, 0];
    const subject = makeSubject<number>();

    const data$ = pipe(
      merge(of(1), subject),
      uponEnd(() => assert.fail('should not unsubscribe source')),
      remember(2)
    );

    const unsubscribe1 = pipe(
      data$,
      subscribe(x => {
        assert.strictEqual(x, 1);
        numCalled[0]++;
      })
    );

    let expected = [1, 2];
    const unsubscribe2 = pipe(
      data$,
      subscribe(x => {
        assert.strictEqual(x, expected.shift());
        numCalled[1]++;
      })
    );

    setTimeout(() => {
      unsubscribe1();
      subject(1, 2);
      unsubscribe2();

      assert.deepStrictEqual(numCalled, [1, 2]);
      done();
    }, 10);
  });
});
