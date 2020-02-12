import { Operator } from './types';

export function filter<A>(predicate: (a: A) => boolean): Operator<A, A> {
  return source => (_, sink) => {
    source(0, (t: any, d: any) => {
      if (t === 1) {
        if (predicate(d)) sink(t, d);
      } else sink(t, d);
    });
  };
}
