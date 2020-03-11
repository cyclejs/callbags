import { Operator, END } from './types';

export function startWith<T>(value: T): Operator<T, T> {
  return source => (_, sink) => {
    let ended = false;
    source(0, (t, d) => {
      if (t === 0) {
        sink(0, (_: END) => {
          ended = true;
          d(2);
        });
        if (ended) return;
        sink(1, value);
      } else sink(t, d);
    });
  };
}
