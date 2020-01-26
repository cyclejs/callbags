import { Operator } from './types';

export function take<T>(n: number): Operator<T, T> {
  return source => (start, sink) => {
    if (start !== 0) return;

    let taken = 0;

    source(0, (t, d) => {
      if (t === 1) {
        sink(1, d);
        if (++taken >= n) {
          sink(2);
        }
      }
    });
  };
}

export const first = /*#__PURE__*/ take(1);
