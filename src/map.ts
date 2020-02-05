import { Operator } from './types';

export function map<A, B>(f: (a: A) => B): Operator<A, B> {
  return source => (_, sink) => {
    source(0, (t, d) => {
      sink(t, t === 1 ? f(d) : d);
    });
  };
}

export function scan<A, B>(
  f: (accumulator: B, current: A) => B,
  start?: B
): Operator<A, B> {
  let hasAcc = arguments.length === 2;
  return source => (_, sink) => {
    let acc: any = start;
    source(0, (t, d) => {
      if (t === 0) {
        sink(t, d);
        if (hasAcc) sink(1, acc);
      } else if (t === 1) {
        if (hasAcc) acc = f(acc, d);
        else {
          hasAcc = true;
          acc = d;
        }

        sink(1, acc);
      } else sink(t, d);
    });
  };
}
