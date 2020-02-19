import * as assert from 'assert';
import { unsubscribeEarly } from './helpers';

import { pipe, makeSubject, subscribe } from '../src/index';

describe('makeSubject', () => {
  it('should allow sinks to unsubscribe', () => {
    const subject = makeSubject<number>();

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
  });
});
