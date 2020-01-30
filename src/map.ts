import { Operator } from './types';
import { undef } from './constants';

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
  return source => (_, sink) => {
    let acc: any = start ?? undef;
    source(0, (t, d) => {
      if (t === 0) {
        sink(t, d);
        if (acc !== undef) sink(1, acc);
      } else if (t === 1) {
        if (acc === undef) acc = d;
        else acc = f(acc, d);

        sink(1, acc);
      } else sink(t, d);
    });
  };
}
