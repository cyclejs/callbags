import { Operator, Producer, ExtractContent } from './types';
import { combine } from './combine';

export function sampleCombine<T, U extends [...Producer<any>[]]>(
  ...sources: U
): Operator<T, Prepend<T, ExtractContent<U>>> {
  return sampleWith((x, y) => [x, ...y], combine<U>(...sources));
}

export function sample<T, U>(source: Producer<U>): Operator<T, U> {
  return sampleWith((_, x) => x, source);
}

export function sampleWith<T, R, U>(
  f: (data: T, sampled: R) => U,
  sample: Producer<R>
): Operator<T, U> {
  return source => (_, sink) => {
    let hasSampled = false;
    let sampled: any;
    let sampleTalkback: any;
    let talkback: any;
    let errored = false;

    sample(0, (t, d) => {
      if (t === 1) {
        hasSampled = true;
        sampled = d;
      } else if (t === 0) {
        sampleTalkback = d;
      } else {
        sampleTalkback = void 0;

        if (d) {
          errored = true;
          sink(t, d);
          talkback?.(t, d);
        }
      }
    });

    source(0, (t, d) => {
      if (t === 1) {
        if (hasSampled) sink(1, f(d, sampled));
      } else if (t === 0) {
        talkback = d;
      } else if (!errored) {
        sink(t, d);
        sampleTalkback?.(t, d);
      }
    });
  };
}

// Because typescript is stupid and [T, ...U] does not work (#26113)
type Prepend<U, T extends [...any[]]> = ((u: U, ...rest: T) => any) extends (
  ...res: infer X
) => any
  ? X
  : never;
