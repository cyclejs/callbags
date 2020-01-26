import { Source } from './types';

export function throwError(error: any): Source<any> {
  return (_, sink) => {
    sink(0);
    sink(2, error);
  };
}
