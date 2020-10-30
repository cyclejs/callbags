import { Producer, Talkback, END, ALL } from './types';

export function flatten<T>(source: Producer<Producer<T>>): Producer<T> {
  return (_, sink) => {
    let outerTalkback: Talkback | undefined;
    let innerTalkback: Talkback | undefined;

    const talkback = (_: END) => {
      innerTalkback?.(2);
      outerTalkback?.(2);
    };

    source(0, (t, d) => {
      if (t === 0) {
        outerTalkback = d;
        sink(0, talkback);
      } else if (t === 1) {
        const innerProducer: Producer<any> = d;
        innerTalkback?.(2);
        innerProducer(0, (t: ALL, d: any) => {
          if (t === 0) innerTalkback = d;
          else if (t === 1) sink(1, d);
          else if (t === 2 && d) {
            outerTalkback!(2);
            sink(2, d);
          } else {
            if (!outerTalkback) sink(2);
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
        else outerTalkback = void 0;
      }
    });
  };
}
