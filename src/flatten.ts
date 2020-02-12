import { Callbag, Source, ALL } from './types';

export function flatten<T>(source: Source<Source<T>>): Source<T> {
  return (_, sink) => {
    let outerTalkback: Callbag<void, void>;
    let innerTalkback: Callbag<void, void> | undefined;
    let outerEnded = false;

    const talkback: Callbag<void, void> = (_: 0 | 1 | 2) => {
      outerTalkback(2);
    };

    source(0, (t: 0 | 1 | 2, d: any) => {
      if (t === 0) {
        outerTalkback = d;
        sink(0, talkback);
      } else if (t === 1) {
        const innerSource: Source<any> = d;
        innerTalkback?.(2);
        innerSource(0, (t: ALL, d: any) => {
          if (t === 0) innerTalkback = d;
          else if (t === 1) sink(1, d);
          else if (t === 2 && d) {
            outerTalkback(2);
            sink(2, d);
          } else {
            if (outerEnded) sink(2);
            else {
              innerTalkback = void 0;
            }
          }
        });
      } else if (t === 2 && d) {
        innerTalkback?.(2);
        sink(2, d);
      } else {
        if (!innerTalkback) sink(2);
        else outerEnded = true;
      }
    });
  };
}
