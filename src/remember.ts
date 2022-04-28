import { Operator, StrictSink } from './types';

export function remember<T>(
  numRemembered: number = 1,
  shouldUnsubscribe: boolean = false
): Operator<T, T> {
  return source => {
    const marker = {};
    let sinks: Array<StrictSink<T> | undefined> = [];
    let talkback: any;
    let lasts: T[] = Array(numRemembered).fill(marker);
    let curr = -1;
    let started = false;

    const mkTalkback = (sink: StrictSink<T>) => () => {
      sinks[sinks.indexOf(sink)] = void 0;

      if (shouldUnsubscribe) {
        // Allow others to subscribe in the same iteration of the JS event loop
        queueMicrotask(() => {
          if (sinks.every(x => x === undefined)) {
            sinks = [];
            talkback(2);
          }
        });
      }
    };

    return (_, sink) => {
      sinks.push(sink);

      if (!started) {
        source(0, (t, d) => {
          if (t === 0) {
            started = true;
            talkback = d;
            for (let i = 0; i < sinks.length; i++) {
              const sink = sinks[i]!;
              sink(0, mkTalkback(sink));
            }
          } else {
            if (t === 1) {
              curr = (curr + 1) % numRemembered;
              lasts[curr] = d;
            }

            let hasDeleted = false;
            for (let i = 0; i < sinks.length; i++) {
              const sink = sinks[i];
              if (sink) sink(t, d);
              else hasDeleted = true;
            }

            if (hasDeleted) {
              sinks = sinks.filter(x => x !== undefined);
            }
          }
        });
      } else {
        sink(0, mkTalkback(sink));
        for (let i = 0; i < lasts.length; i++) {
          let idx = (curr + 1 + i) % numRemembered;
          if (lasts[idx] !== marker) {
            sink(1, lasts[idx]);
          }
        }
      }
    };
  };
}
