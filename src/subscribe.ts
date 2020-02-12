import { Consumer } from './types';

export type Observer<T> = {
  next: (data: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
};

export function subscribe<T>(o: Observer<T>): Consumer<T> {
  return source => {
    source(0, (t: any, d: any) => {
      if (t === 1) o.next(d);
      if (t === 2) {
        if (d === undefined) o.complete?.();
        else o.error?.(d);
      }
    });
  };
}
