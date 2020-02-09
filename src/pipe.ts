import { Operator, Source, Sink, Callbag } from './types';

// Returning a new callbag

// prettier-ignore
export function pipe<A, B>(source: Source<A> | Callbag<A>, o1: Operator<A, B>): Callbag<B>;
// prettier-ignore
export function pipe<A, B, C>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>): Callbag<C>;
// prettier-ignore
export function pipe<A, B, C, D>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>): Callbag<D>;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>): Callbag<E>;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>): Callbag<F>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>): Callbag<G>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>): Callbag<H>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>): Callbag<I>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>): Callbag<J>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>): Callbag<K>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>): Callbag<L>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>): Callbag<M>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>): Callbag<N>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>): Callbag<O>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>): Callbag<P>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>): Callbag<Q>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>): Callbag<R>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>): Callbag<S>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>): Callbag<T>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(source: Source<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>, o20: Operator<T, U>): Callbag<U>;

// Returning void

// prettier-ignore
export function pipe<A>(source: Source<A> | Callbag<A>, sink: Sink<A>): void;
// prettier-ignore
export function pipe<A, B>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, sink: Sink<B>): void;
// prettier-ignore
export function pipe<A, B, C>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, sink: Sink<C>): void;
// prettier-ignore
export function pipe<A, B, C, D>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, sink: Sink<D>): void;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, sink: Sink<E>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, sink: Sink<F>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, sink: Sink<G>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, sink: Sink<H>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, sink: Sink<I>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, sink: Sink<J>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, sink: Sink<K>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, sink: Sink<L>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, sink: Sink<M>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, sink: Sink<N>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, sink: Sink<O>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, sink: Sink<P>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, sink: Sink<Q>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, sink: Sink<R>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, sink: Sink<S>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Source<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, o20: Operator<S, T>, sink: Sink<T>): void;

export function pipe<T>(
  source: Source<T>,
  ...ops: Array<Operator<any, any> | Sink<any>>
): Callbag<any> | void {
  let res: any = source;

  for (let i = 0; i < ops.length; i++) {
    res = ops[i](res);
  }

  return res;
}
