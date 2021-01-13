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

export function makeAsyncSubject<T>(): Subject<T> {
  let sinks: Array<any | undefined> = [];
  let buffer1: Array<T> = [];
  let buffer2: Array<T> = [];
  let bufferLength = 0;
  let promise: Promise<void> | undefined;

  const scheduleData = () =>
    Promise.resolve().then(() => {
      // We use two buffers to avoid allocating new arrays all the time
      const tmp = buffer2;
      const bufLen = bufferLength;
      buffer2 = buffer1;
      buffer1 = tmp;
      bufferLength = 0;

      let hasDeleted = false;

      for (let i = 0; i < bufLen; i++) {
        for (let j = 0; j < sinks.length; j++) {
          if (sinks[j]) sinks[j](1, buffer2[i]);
          else hasDeleted = true;
        }
      }

      if (hasDeleted) {
        sinks = sinks.filter(Boolean);
      }

      if (bufferLength > 0) {
        promise = scheduleData();
      } else {
        promise = void 0;
      }
    });

  return (type: ALL, data: unknown) => {
    if (type === 0) {
      const sink = data as any;
      sinks.push(sink);
      sink(0, () => {
        const i = sinks.indexOf(sink);
        sinks[i] = void 0;
      });
      if (!promise) {
        promise = scheduleData();
      }
    } else if (type === 1) {
      buffer1[bufferLength++] = data as T;
      if (!promise) {
        promise = scheduleData();
      }
    } else {
      for (const sink of sinks) {
        sink?.(type, data);
      }
    }
  };
}
