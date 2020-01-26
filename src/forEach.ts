import { Sink } from './types';

export function forEach<T>(f: (t: T) => void): Sink<T> {
  return source => {
    let talkback: any;
    source(0, (t, d) => {
      if (t === 0) talkback = d;
      if (t === 1) f(d);
      if (t === 1 || t === 0) talkback(1);
    });
  };
}
