import { Producer, StrictSink } from './types';

export function multicast<T>(source: Producer<T>): Producer<T> {
  let sinks: Array<StrictSink<T> | undefined> = [];
  let talkback: any;
  let lasts: T[] = [];
  let started = false;
  let timerActive = false;

  const mkTalkback = (sink: StrictSink<T>) => () => {
    sinks[sinks.indexOf(sink)] = void 0;

    // Allow others to subscribe in the same iteration of the JS event loop
    Promise.resolve().then(() => {
      if (sinks.every(x => x === undefined)) {
        sinks = [];
        talkback(2);
      }
    });
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
            lasts.push(d);
            if (!timerActive) {
              timerActive = true;
              Promise.resolve().then(() => {
                lasts = [];
                timerActive = false;
              });
            }
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
        sink(1, lasts[i]);
      }
    }
  };
}
