import { Source, ALL } from './types';

export function fromArray<T>(arr: Array<T>): Source<T> {
  return (start, sink) => {
    if (start !== 0) return;
    let index = 0;
    let completed = false;
    let got1 = false;
    let inloop = false;

    sink(0, (t: ALL) => {
      if (completed) return;

      if (t === 1) {
        got1 = true;
        if (!inloop && index < arr.length) {
          inloop = true;

          while (got1 && !completed) {
            got1 = false;

            sink(1, arr[index]);
            index++;

            if (index >= arr.length) {
              sink(2);
              break;
            }
          }

          inloop = false;
        }
      } else if (t === 2) {
        completed = true;
      }
    });
  };
}

export function fromPromise<T>(p: Promise<T>): Source<T> {
  return (start, sink) => {
    if (start !== 0) return;
    let ended = false;

    const resolve = (x: T) => {
      if (ended) return;
      sink(1, x);
      if (ended) return;
      sink(2);
    };

    const reject = (err = new Error()) => {
      if (ended) return;
      sink(2, err);
    };

    p.then(resolve, reject);

    sink(0, (t: ALL) => {
      if (t === 2) ended = true;
    });
  };
}

export function from<T>(p: Promise<T> | Array<T>): Source<T> {
  if (Array.isArray(p)) {
    return fromArray(p);
  } else {
    return fromPromise(p);
  }
}

export function of<T>(...args: Array<T>): Source<T> {
  return fromArray(args);
}
