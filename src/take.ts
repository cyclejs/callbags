import { Operator } from './types';

export function take<T>(n: number): Operator<T, T> {
  return source => (_, sink) => {
    let talkback: any;
    let taken = 0;

    source(0, (t, d) => {
      if (t === 0) talkback = d;
      if (t === 1) {
        sink(1, d);
        if (++taken >= n) {
          talkback(2);
          sink(2);
        }
      }
    });
  };
}

export const first = /*#__PURE__*/ take(1);
