import { Operator } from './types';

export function uponStart<T>(fn: () => void): Operator<T, T> {
  return source => (_, sink) => {
    source(0, (t, d) => {
      if (t === 0) fn();
      sink(t, d);
    });
  };
}

export function uponEnd<T>(fn: (d?: any) => void): Operator<T, T> {
  return source => (_, sink) => {
    source(0, (t, d) => {
      if (t === 2) fn(d);
      sink(t, d);
    });
  };
}
