import * as assert from 'assert';
import { unsubscribeEarly } from './helpers';

import { pipe, subscribe, empty, never, create } from '../src/index';

describe('identity tests', () => {
  it('empty() should not deliver data and complete', done => {
    pipe(
      empty(),
      subscribe(() => done('should not deliver data'), done)
    );
  });

  it('empty() should allow to unsubscribe early', done => {
    pipe(
      empty(),
      unsubscribeEarly(t => t === 0),
      subscribe(() => done('should not deliver data'), done)
    );
  });

  it('never() should not deliver data nor complete', done => {
    pipe(
      never(),
      subscribe(
        () => done('should not deliver data'),
        () => done('should not complete')
      )
    );
    setTimeout(done, 200);
  });

  it('create() should allow to create simple callbags', done => {
    let completed = false;
    let expected = [1, 2, 3, 4];
    pipe(
      create(
        (next, complete) => {
          for (const x of [1, 2, 3, 4]) {
            next(x);
          }
          complete();
        },
        () => {
          completed = true;
        }
      ),
      subscribe(x => {
        assert.strictEqual(x, expected.shift());
      })
    );

    setTimeout(() => {
      assert.strictEqual(completed, true);
      done();
    }, 20);
  });

  it('create() should allow to unsubscribe early', done => {
    pipe(
      create((next, complete) => {
        for (const x of [1, 2, 3, 4]) {
          next(x);
        }
        complete();
      }),
      unsubscribeEarly(t => t === 0),
      subscribe(() => done('should not deliver data'), done)
    );
  });

  it('create() should call completion callback when unsubscribing early', done => {
    let completed = false;
    pipe(
      create(
        (next, complete) => {
          for (const x of [1, 2, 3, 4]) {
            next(x);
          }
          complete();
        },
        () => {
          completed = true;
        }
      ),
      unsubscribeEarly(t => t === 0),
      subscribe(() => done('should not deliver data'))
    );
    setTimeout(() => {
      assert.strictEqual(completed, true);
      done();
    }, 20);
  });

  it('create() should allow to omit completion callback', done => {
    let expected = [1, 2, 3, 4];
    pipe(
      create((next, complete) => {
        for (const x of [1, 2, 3, 4]) {
          next(x);
        }
        complete();
      }),
      subscribe(x => {
        assert.strictEqual(x, expected.shift());
      }, done)
    );
  });
});
