import { Operator } from './types';
import { undef } from './constants';

export function skip<T>(n: number): Operator<T, T> {
  return source => (_, sink) => {
    let skipped = 0;

    source(0, (t, d) => {
      if (!(t === 1 && ++skipped <= n)) sink(t, d);
    });
  };
}

export function last<T>(): Operator<T, T> {
  return source => (_, sink) => {
    let last: any = undef;

    source(0, (t, d) => {
      if (t === 1) last = d;
      else if (t === 2 && last !== undef) sink(1, last);
      if (t !== 1) sink(t, d);
    });
  };
}
