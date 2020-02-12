import { Operator, Callbag } from './types';

export function take<T>(n: number): Operator<T, T> {
  return source => (_, sink) => {
    let talkback: Callbag<void, void>;
    let taken = 0;

    source(0, (t: 0 | 1 | 2, d: any) => {
      if (t === 0) talkback = d;
      else if (t === 1) {
        sink(1, d);
        taken++;
      } else sink(t, d);

      if (taken >= n) {
        talkback(2);
        sink(2);
      }
    });
  };
}

export function first<T>(): Operator<T, T> {
  return take(1);
}
