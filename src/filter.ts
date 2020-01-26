import { Operator } from './types';

export function filter<A>(predicate: (a: A) => boolean): Operator<A, A> {
  return source => (start, sink) => {
    if (start !== 0) return;

    source(0, (t, d) => {
      if (t === 1) {
        if (predicate(d)) sink(t, d);
      } else sink(t, d);
    });
  };
}
