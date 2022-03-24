import { Operator, Producer } from './types';

export function drop<T>(n: number): Operator<T, T> {
  return source => (_, sink) => {
    let skipped = 0;

    source(0, (t, d) => {
      if (!(t === 1 && ++skipped <= n)) sink(t, d);
    });
  };
}

export function last<T>(source: Producer<T>): Producer<T> {
  return (_, sink) => {
    let last: any[] = [];

    source(0, (t, d) => {
      if (t === 1) last[0] = d;
      else if (t === 2 && last.length > 0) sink(1, last[0]);
      if (t !== 1) sink(t, d);
    });
  };
}
