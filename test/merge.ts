import * as assert from 'assert';
import * as fc from 'fast-check';
import { unsubscribeEarly } from './helpers';

import {
  Source,
  pipe,
  merge,
  subscribe,
  fromArray,
  of,
  fromPromise
} from '../src/index';

describe('merge', () => {
  it('should deliver synchronous sources in order', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.integer())), arr => {
        const oracle = arr.reduce((acc, curr) => acc.concat(curr), []);

        let result: any[] = [];
        pipe(
          merge(...arr.map(fromArray)),
          subscribe(x => result.push(x))
        );

        assert.deepStrictEqual(oracle, result);
      })
    );
  });

  it('should not send data if unsubscribed after handshake', () => {
    let completed = false;

    pipe(
      merge(of(1), of(2), of(3)),
      unsubscribeEarly(t => t === 0),
      subscribe(
        () => assert.fail('should not receive data'),
        e => {
          if (e) assert.fail('should not terminate with error');
          else completed = true;
        }
      )
    );

    assert.strictEqual(completed, true);
  });

  it('should complete other sources on error', done => {
    let numCompleted = 0;

    const testSource: Source<number> = (_, sink) => {
      sink(0, (t: any, d: any) => {
        if (t === 2 && !d) {
          numCompleted++;
        }
      });
    };

    pipe(
      merge(
        testSource,
        fromPromise(Promise.reject('someError')),
        testSource,
        testSource
      ),
      subscribe(
        () => assert.fail('should not receive data'),
        err => {
          if (err) {
            assert.strictEqual(err, 'someError');
            assert.strictEqual(numCompleted, 3);
            done();
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );
  });

  // This test only makes sense with coverage
  it('should cleanup sources that complete early', done => {
    const testSource: Source<number> = (_, sink) => {
      sink(0, () => {});
      sink(2);
    };

    pipe(
      merge(
        testSource,
        fromPromise(Promise.reject('someError')),
        testSource,
        testSource
      ),
      subscribe(
        () => assert.fail('should not receive data'),
        err => {
          if (err) {
            assert.strictEqual(err, 'someError');
            done();
          } else {
            assert.fail('should not terminate');
          }
        }
      )
    );
  });
});
