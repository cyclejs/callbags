import { Operator, END } from './types';

export function take<T>(n: number): Operator<T, T> {
  return source => (_, sink) => {
    let talkback: any;
    let ended = false;
    let taken = 0;

    source(0, (t, d) => {
      if (t === 0) {
        talkback = d;
        sink(0, (_: END) => {
          ended = true;
          talkback(2);
        });
        return;
      }
      if (t === 1) {
        if (taken === n) {
          return;
        }
        taken++;
        sink(1, d);
        if (!ended && taken === n) {
          talkback(2);
          sink(2);
        }
        return;
      }
      sink(t, d);
    });
  };
}

export function first<T>(): Operator<T, T> {
  return take(1);
}
