import { Subject, ALL, StrictSink } from './types';

export function makeSubject<T>(): Subject<T> {
  let sinks: Array<StrictSink<T> | undefined> = [];

  return (type: ALL, data: unknown) => {
    if (type === 0) {
      const sink = data as StrictSink<T>;
      sinks.push(sink);
      sink(0, () => {
        const i = sinks.indexOf(sink);
        sinks[i] = void 0;
      });
    } else {
      let hasDeleted = false;

      for (let i = 0; i < sinks.length; i++) {
        if (sinks[i]) sinks[i]!(type, data);
        else hasDeleted = true;
      }

      if (hasDeleted) {
        sinks = sinks.filter(x => x !== undefined);
      }
    }
  };
}

export function makeReplaySubject<T>(numReplays = 1): Subject<T> {
  let sinks: Array<StrictSink<T> | undefined> = [];
  let buffer: Array<T> | undefined = [];
  let replays = 0;

  return (type: ALL, data: unknown) => {
    if (type === 0) {
      const sink = data as StrictSink<T>;
      sinks.push(sink);
      sink(0, () => {
        const i = sinks.indexOf(sink);
        sinks[i] = void 0;
      });
      if (buffer) {
        for (const x of buffer) {
          sink(1, x);
        }
        if (++replays >= numReplays) {
          buffer = void 0;
        }
      }
    } else {
      let hasDeleted = false;

      if (buffer && type === 1) {
        buffer.push(data as T);
      }
      for (let i = 0; i < sinks.length; i++) {
        if (sinks[i]) sinks[i]!(type, data);
        else hasDeleted = true;
      }

      if (hasDeleted) {
        sinks = sinks.filter(x => x !== undefined);
      }
    }
  };
}
