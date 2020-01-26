import { Operator } from './types';

export function filter<A>(predicate: (a: A) => boolean): Operator<A, A> {
  return source => (start, sink) => {
    if (start !== 0) return;

    let talkback: any;

    source(0, (t, d) => {
      if (t === 0) {
        talkback = d;
        sink(t, d);
      } else if (t === 1) {
        if (predicate(d)) sink(t, d);
        else talkback(1);
      } else sink(t, d);
    });
  };
}
