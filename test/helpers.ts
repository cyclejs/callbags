import { Operator } from '../src/index';

export function unsubscribeEarly<T>(
  when: (t: number) => boolean
): Operator<T, T> {
  return source => (_, sink) => {
    let talkback: any;
    source(0, (t, d) => {
      if (t === 0) talkback = d;
      if (when(t)) {
        talkback(2);
        sink(2);
      }
      sink(t, d);
    });
  };
}
