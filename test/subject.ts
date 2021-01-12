import * as assert from 'assert';
import { unsubscribeEarly } from './helpers';

import {
  pipe,
  makeSubject,
  makeAsyncSubject,
  subscribe,
  Subject,
} from '../src/index';

function makeUnsubscribeTest(fn: () => Subject<number>) {
  return () => {
    const subject = fn();

    pipe(
      subject,
      unsubscribeEarly(t => t === 0),
      subscribe(
        () => assert.fail('should not deliver data'),
        e => {
          if (e) assert.fail('should not terminate with error');
        }
      )
    );

    for (const x of [1, 2, 3, 4, 5]) {
      subject(1, x);
    }
  };
}

describe('makeSubject', () => {
  it('should allow sinks to unsubscribe', makeUnsubscribeTest(makeSubject));
  it(
    'should allow sinks to unsubscribe (replaySubject)',
    makeUnsubscribeTest(makeAsyncSubject)
  );
});
