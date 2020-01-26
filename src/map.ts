import { Operator } from './types';

export function map<A, B>(f: (a: A) => B): Operator<A, B> {
  return source => (_, sink) => {
    source(0, (t, d) => {
      sink(t, t === 1 ? f(d) : d);
    });
  };
}
