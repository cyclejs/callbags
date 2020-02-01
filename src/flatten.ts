import { Operator, Callbag, END, ALL } from './types';

export function flatten<T>(): Operator<Callbag<T>, T> {
  return source => (_, sink) => {
    let outerTalkback: any;
    let innerTalkback: any;
    let outerEnded = false;

    const talkback = (_: END) => {
      outerTalkback(2);
    };

    source(0, (t, d) => {
      if (t === 0) {
        outerTalkback = d;
        sink(0, talkback);
      } else if (t === 1) {
        const innerSource: Callbag<any> = d;
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
