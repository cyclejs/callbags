import * as assert from 'assert';

import {
  pipe,
  subscribe,
  of,
  uponStart,
  multicast,
  fromArray,
  fromPromise,
  merge,
  first,
  take
} from '../src/index';

describe('multicast tests', () => {
  it('should call hook once per subscribe without multicast', done => {
    let numHook = 0;
    const of$ = pipe(
      of('some value'),
      uponStart(() => {
        numHook++;
      })
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
      assert.strictEqual(listener1Called, true);
      assert.strictEqual(listener2Called, true);
      assert.strictEqual(numHook, 2);
      done();
    }, 20);
  });

  it('should call hook only once with multicast', done => {
    let numHook = 0;
    const of$ = pipe(
      of('some value'),
      uponStart(() => {
        numHook++;
      }),
      multicast
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

  it('should allow to unsubscribe during emission with multicast', done => {
    let numHook = 0;
    const of$ = pipe(
      fromArray([1, 2, 3, 4, 5]),
      uponStart(() => {
        numHook++;
      }),
      multicast
    );

    let numCalled = [0, 0, 0];

    pipe(
      of$,
      take(1),
      subscribe(x => {
        assert.strictEqual(x, 1);
        numCalled[0]++;
      })
    );

    let expected2 = [1, 2, 3];
    pipe(
      of$,
      take(3),
      subscribe(x => {
        assert.strictEqual(x, expected2.shift());
        numCalled[1]++;
      })
    );

    let expected3 = [1, 2, 3, 4];
    pipe(
      of$,
      take(4),
      subscribe(x => {
        assert.strictEqual(x, expected3.shift());
        numCalled[2]++;
      })
    );

    setTimeout(() => {
      assert.deepStrictEqual(numCalled, [1, 3, 4]);
      assert.strictEqual(numHook, 1);
      done();
    }, 20);
  });

  it('should only call hook once with async emissions', done => {
    let numHook = 0;
    const of$ = pipe(
      merge(...[1, 2, 3, 4].map(x => fromPromise(Promise.resolve(x)))),
      uponStart(() => {
        numHook++;
      }),
      multicast
    );

    let listener1Called = false;
    let listener2Called = false;

    pipe(
      of$,
      first(),
      subscribe(x => {
        assert.strictEqual(x, 1);
        listener1Called = true;
      })
    );

    let expected = [1, 2, 3, 4];
    pipe(
      of$,
      subscribe(x => {
        assert.strictEqual(expected.indexOf(x) !== -1, true);
        expected = expected.filter(y => y !== x);
        listener2Called = true;
      })
    );

    setTimeout(() => {
      assert.strictEqual(listener1Called, true, 'listener 1 called');
      assert.strictEqual(listener2Called, true, 'listener 2 called');
      assert.strictEqual(numHook, 1);
      done();
    }, 20);
  });
});
