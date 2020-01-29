export type START = 0;
export type DATA = 1;
export type END = 2;

export type ALL = START | DATA | END;

export type Callbag<T> = (type: START, payload: any | T) => void;

export type Source<T> = (type: START, sink: Talkback<T>) => void;

export type Sink<T> = (source: Source<T>) => void;

export type Talkback<T> = (t: ALL, d?: any | T) => void;

export type Operator<A, B> = (source: Source<A>) => Callbag<B>;

export type Factory<T> = (...args: Array<any>) => Callbag<T>;
