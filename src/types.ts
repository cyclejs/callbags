export type START = 0;
export type DATA = 1;
export type END = 2;

export type ALL = START | DATA | END;

export type Talkback = (type: END, payload?: any) => void;

export type Sink<T> = (type: ALL, payload?: any) => void;

export type Producer<T> = (t: START, sink: Sink<T>) => void;

export type StrictSink<T> = {
  (t: START, d: Talkback): void;
  (t: DATA, d: T): void;
  (t: END, d?: unknown): void;
  (t: ALL, d?: unknown): void;
};

export type Subject<T> = {
  (t: START, d: StrictSink<T>): void;
  (t: DATA, d: T): void;
  (t: END, d?: unknown): void;
};

export type Dispose = () => void;

export type Consumer<T> = (source: Producer<T>) => Dispose;

export type Operator<A, B> = (source: Producer<A>) => Producer<B>;

export type ExtractContent<T extends [...Producer<any>[]]> = {
  [k in keyof T]: T[k] extends Producer<infer U> ? U : never;
};
