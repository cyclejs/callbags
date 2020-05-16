import { Producer } from './types';

import { create } from './identities';

export function fromArray<T>(arr: Array<T>): Producer<T> {
  let ended = false;
  return create(
    (next, complete) => {
      for (let i = 0; i < arr.length; i++) {
        if (ended) return;
        next(arr[i]);
      }
      complete();
    },
    () => {
      ended = true;
    }
  );
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
