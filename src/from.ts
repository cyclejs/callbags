import { Producer, END } from './types';

export function fromArray<T>(arr: Array<T>): Producer<T> {
  return (_, sink) => {
    let ended = false;

    sink(0, (_: END) => {
      ended = true;
    });

    for (let i = 0; i < arr.length; i++) {
      if (ended) break;
      sink(1, arr[i]);
    }
    if (!ended) sink(2);
  };
}

export function fromPromise<T>(p: Promise<T>): Producer<T> {
  return (_, sink) => {
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

    sink(0, (_: END) => {
      ended = true;
    });
  };
}

export function from<T>(p: Promise<T> | Array<T>): Producer<T> {
  if (Array.isArray(p)) {
    return fromArray(p);
  } else {
    return fromPromise(p);
  }
}

export function of<T>(x: T): Producer<T> {
  return (_, sink) => {
    let ended = false;

    sink(0, (_: END) => {
      ended = true;
    });

    if (ended) return;
    sink(1, x);
    if (!ended) sink(2);
  };
}
