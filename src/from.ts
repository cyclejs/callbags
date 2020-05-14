import { Producer, END } from './types';

import { create } from './identities';

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
  return create((next, complete) => {
    p.then(
      x => {
        next(x);
        complete();
      },
      (err = new Error()) => {
        complete(err);
      }
    );
  });
}

export function from<T>(p: Promise<T> | Array<T>): Producer<T> {
  if (Array.isArray(p)) {
    return fromArray(p);
  } else {
    return fromPromise(p);
  }
}

export function of<T>(x: T): Producer<T> {
  return create((next, complete) => {
    next(x);
    complete();
  });
}
