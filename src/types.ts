export type START = 0;
export type DATA = 1;
export type END = 2;

export type ALL = START | DATA | END;

export type Callbag<I, O> = {
  (t: START, d: Callbag<O, void>): void;
  (t: DATA, d: I): void;
  (t: END, d?: any): void;
  (t: any, d: any): void;
};

export type Source<T> = (t: START, d: Callbag<T, void>) => void;

export type Dispose = () => void;

export type Consumer<T> = (source: Source<T>) => Dispose | void;

export type Operator<A, B> = (source: Source<A>) => Source<B>;

export type Factory<T> = (...args: Array<any>) => Source<T>;

export type ExtractContent<T extends [...Source<any>[]]> = {
  [k in keyof T]: T[k] extends Source<infer U> ? U : never;
};
