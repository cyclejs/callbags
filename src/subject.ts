import { Callbag, Source, ALL } from './types';

export function makeSubject<T>(): Callbag<T> & { source: Source<T> } {
  let sinks: any[] = [];

  const cb = (type: ALL, data: any) => {
    if (type === 0) {
      const sink = data;
      sinks.push(data);
      sink(0, () => {
        const i = sinks.indexOf(sink);
        sinks[i] = void 0;
      });
    } else {
      let hasDeleted = false;

      for (let i = 0; i < sinks.length; i++) {
        if (sinks[i]) sinks[i](type, data);
        else hasDeleted = true;
      }

      if (hasDeleted) {
        sinks = sinks.filter(x => x !== undefined);
      }
    }
  };

  cb.source = cb;

  return cb;
}
