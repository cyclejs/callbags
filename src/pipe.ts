import { Operator, Source, Consumer } from './types';

// Returning a new callbag

// prettier-ignore
export function pipe<A, B>(source: Source<A>, o1: Operator<A, B>): Source<B>;
// prettier-ignore
export function pipe<A, B, C>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>): Source<C>;
// prettier-ignore
export function pipe<A, B, C, D>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>): Source<D>;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>): Source<E>;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>): Source<F>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>): Source<G>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>): Source<H>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>): Source<I>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>): Source<J>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>): Source<K>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>): Source<L>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>): Source<M>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>): Source<N>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>): Source<O>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>): Source<P>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>): Source<Q>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>): Source<R>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>): Source<S>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>): Source<T>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(source: Source<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>, o20: Operator<T, U>): Source<U>;

// Returning void

// prettier-ignore
export function pipe<A>(source: Source<A>, consumer: Consumer<A>): void;
// prettier-ignore
export function pipe<A, B>(source: Source<A>, o2: Operator<A, B>, consumer: Consumer<B>): void;
// prettier-ignore
export function pipe<A, B, C>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, consumer: Consumer<C>): void;
// prettier-ignore
export function pipe<A, B, C, D>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, consumer: Consumer<D>): void;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, consumer: Consumer<E>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, consumer: Consumer<F>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, consumer: Consumer<G>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, consumer: Consumer<H>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, consumer: Consumer<I>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, consumer: Consumer<J>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, consumer: Consumer<K>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, consumer: Consumer<L>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, consumer: Consumer<M>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, consumer: Consumer<N>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, consumer: Consumer<O>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, consumer: Consumer<P>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, consumer: Consumer<Q>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, consumer: Consumer<R>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, consumer: Consumer<S>): void;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Source<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, o20: Operator<S, T>, consumer: Consumer<T>): void;

export function pipe<T>(
  source: Source<T>,
  ...ops: Array<Operator<any, any> | Consumer<any>>
): Source<any> | void {
  let res: any = source;

  for (let i = 0; i < ops.length; i++) {
    res = ops[i](res);
  }

  return res;
}
