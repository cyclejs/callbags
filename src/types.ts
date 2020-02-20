export type START = 0;
export type DATA = 1;
export type END = 2;

export type ALL = START | DATA | END;

/**
 * The Callbag type should look like this, but TypeScript inference is not good enough:
 * ```ts
 * export type Callbag<T> = {
 *   (t: START, d: Talkback): void;
 *   (t: DATA, d: T): void;
 *   (t: END, d?: any): void;
 * };
 * ```
 */
export type Callbag<T> = (t: ALL, d?: Talkback | T | any) => void;

export type Talkback = (type: END, payload?: any) => void;

export type Producer<T> = (t: START, sink: Callbag<T>) => void;

export type Dispose = () => void;

export type Consumer<T> = (source: Producer<T>) => Dispose;

export type Operator<A, B> = (source: Producer<A>) => Producer<B>;

export type ExtractContent<T extends [...Producer<any>[]]> = {
  [k in keyof T]: T[k] extends Producer<infer U> ? U : never;
};
