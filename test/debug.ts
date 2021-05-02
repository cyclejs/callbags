import * as assert from 'assert';
import { pipe, debug, subscribe, fromArray } from '../src/index';

describe('debug', () => {
  const log = console.log;

  it('should log to console when given a string', () => {
    const logs: [string, number][] = [];
    console.log = (x: string, y: number) => {
      logs.push([x, y]);
    };
    let called = false;

    pipe(
      fromArray([1, 2, 3, 4]),
      debug('message'),
      subscribe(
        () => {},
        () => {
          const expected = [
            ['message', 1],
            ['message', 2],
            ['message', 3],
            ['message', 4],
          ];
          assert.deepStrictEqual(logs, expected);
          called = true;
        }
      )
    );

    assert.strictEqual(called, true);
    console.log = log;
  });

  it('should call given function with data', () => {
    const logs: number[] = [];
    const expected = [1, 2, 3, 4];
    let called = false;

    pipe(
      fromArray(expected),
      debug(x => logs.push(x)),
      subscribe(
        () => {},
        () => {
          assert.deepStrictEqual(logs, expected);
          called = true;
        }
      )
    );

    assert.strictEqual(called, true);
  });
});
