import { Consumer, Talkback } from './types';

export function subscribe<T>(
  onData: (t: T) => void,
  onEnd?: (e?: any) => void
): Consumer<T> {
  return source => {
    let talkback: Talkback | undefined;
    let disposeLater = false;
    source(0, (t: any, d: any) => {
      if (t === 0) {
        talkback = d as Talkback;
        if (disposeLater) talkback(2);
      }
      if (t === 1) onData(d);
      if (t === 2) onEnd?.(d);
    });
    return () => {
      if (talkback) talkback(2);
      else disposeLater = true;
      onEnd?.();
    };
  };
}
