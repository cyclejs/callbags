import { Producer, END } from './types';

export function create<T>(
  f: (next: (x: T) => void, complete: (err?: any) => void) => void,
  onComplete?: (err?: any) => void
): Producer<T> {
  return (_, sink) => {
    let ended = false;

    const next = (x: T) => {
      if (ended) return;
      sink(1, x);
    };

    const complete = (err?: any) => {
      if (ended) return;
      sink(2, err);
      onComplete?.(err);
    };

    sink(0, (_: END) => {
      ended = true;
      onComplete?.();
    });

    f(next, complete);
  };
}

export function empty<T>(): Producer<T> {
  return create((_, complete) => {
    complete();
  });
}

export function never<T>(): Producer<T> {
  return create(() => {});
}

export function throwError<T>(error: any): Producer<T> {
  return create((_, complete) => {
    complete(error);
  });
}
