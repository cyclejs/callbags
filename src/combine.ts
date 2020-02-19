import { Source, ExtractContent, Talkback } from './types';

export function combineWith<T extends [...Source<any>[]], U>(
  f: (...args: ExtractContent<T>) => U,
  ...sources: T
): Source<U> {
  return (_, sink) => {
    const n = sources.length;
    let combined: any[] = Array(n).fill(undefined);
    let talkbacks: Array<Talkback | undefined> = Array(n).fill(undefined);
    let numEnded = 0;
    let numStarted = 0;
    let ended = false;

    const talkback = (_: number, d?: any) => {
      ended = true;
      for (let i = 0; i < n; i++) {
        talkbacks[i]?.(2, d);
      }
    };

    for (let i = 0; i < n; i++) {
      if (ended) return;

      sources[i](0, (t, d) => {
        if (t === 0) {
          talkbacks[i] = d;
          if (++numStarted === 1) sink(0, talkback);
        } else if (t === 1) {
          combined[i] = d;
          if (combined.indexOf(undefined) === -1)
            sink(1, f(...(combined as any)));
        } else if (t === 2 && d) {
          ended = true;
          for (let j = 0; j < n; j++) {
            if (j !== i) talkbacks[j]?.(2);
          }
          sink(2, d);
        } else {
          talkbacks[i] = void 0;
          if (++numEnded === n) sink(2);
        }
      });
    }
  };
}

export function combine<T extends [...Source<any>[]]>(
  ...sources: T
): Source<ExtractContent<T>> {
  return combineWith((...x) => x, ...sources);
}
