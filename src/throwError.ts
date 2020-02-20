import { Producer } from './types';

export function throwError<T>(error: any): Producer<T> {
  return (_, sink) => {
    sink(0, () => {});
    sink(2, error);
  };
}
