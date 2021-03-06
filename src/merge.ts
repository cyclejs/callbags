import { Producer, Talkback } from './types';

export function merge<T>(...sources: Producer<T>[]): Producer<T> {
  return (_, sink) => {
    const n = sources.length;
    let ended = false;
    let sourceTalkbacks: Array<Talkback | undefined> = new Array(n);
    let startCount = 0;
    let endCount = 0;

    const talkback: Talkback = (_, d) => {
      ended = true;
      for (let i = 0; i < n; i++) {
        sourceTalkbacks[i]?.(2, d);
      }
    };

    for (let i = 0; i < sources.length; i++) {
      if (ended) return;

      sources[i](0, (t, d) => {
        if (t === 0) {
          sourceTalkbacks[i] = d;
          if (++startCount === 1) sink(0, talkback);
        } else if (t === 2 && d) {
          ended = true;
          for (let j = 0; j < n; j++) {
            if (j !== i) sourceTalkbacks[j]?.(2);
          }
          sink(2, d);
        } else if (t === 2) {
          sourceTalkbacks[i] = void 0;
          if (++endCount === n) sink(2);
        } else sink(t, d);
      });
    }
  };
}
