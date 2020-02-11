import { Source } from './types';

export function throwError<T>(error: any): Source<T> {
  return (_, sink) => {
    sink(0, () => {});
    sink(2, error);
  };
}
