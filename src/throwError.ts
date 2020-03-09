import { Producer } from './types';

export function throwError<T>(error: any): Producer<T> {
  return (_, sink) => {
    let ended = false;
    sink(0, () => {
      ended = true;
    });
    if (ended) return;
    sink(2, error);
  };
}
