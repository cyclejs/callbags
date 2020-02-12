import { Operator } from './types';

export function startWith<T>(value: T): Operator<T, T> {
  return source => (_, sink) => {
    source(0, (t: any, d: any) => {
      if (t === 0) {
        sink(0, d);
        sink(1, value);
      } else sink(t, d);
    });
  };
}
