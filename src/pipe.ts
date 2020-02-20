import { Operator, Producer, Consumer, Callbag, Dispose } from './types';

// Consumer at the end, returning a dispose

// prettier-ignore
export function pipe<A>(source: Producer<A> | Callbag<A>, consumer: Consumer<A>): Dispose;
// prettier-ignore
export function pipe<A, B>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, consumer: Consumer<B>): Dispose;
// prettier-ignore
export function pipe<A, B, C>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, consumer: Consumer<C>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, consumer: Consumer<D>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, consumer: Consumer<E>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, consumer: Consumer<F>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, consumer: Consumer<G>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, consumer: Consumer<H>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, consumer: Consumer<I>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, consumer: Consumer<J>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, consumer: Consumer<K>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, consumer: Consumer<L>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, consumer: Consumer<M>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, consumer: Consumer<N>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, consumer: Consumer<O>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, consumer: Consumer<P>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, consumer: Consumer<Q>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, consumer: Consumer<R>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, consumer: Consumer<S>): Dispose;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Producer<A> | Callbag<A>, o2: Operator<A, B>, o3: Operator<B, C>, o4: Operator<C, D>, o5: Operator<D, E>, o6: Operator<E, F>, o7: Operator<F, G>, o8: Operator<G, H>, o9: Operator<H, I>, o10: Operator<I, J>, o11: Operator<J, K>, o12: Operator<K, L>, o13: Operator<L, M>, o14: Operator<M, N>, o15: Operator<N, O>, o16: Operator<O, P>, o17: Operator<P, Q>, o18: Operator<Q, R>, o19: Operator<R, S>, o20: Operator<S, T>, consumer: Consumer<T>): Dispose;

// Returning a new callbag

// prettier-ignore
export function pipe<A, B>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>): Producer<B>;
// prettier-ignore
export function pipe<A, B, C>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>): Producer<C>;
// prettier-ignore
export function pipe<A, B, C, D>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>): Producer<D>;
// prettier-ignore
export function pipe<A, B, C, D, E>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>): Producer<E>;
// prettier-ignore
export function pipe<A, B, C, D, E, F>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>): Producer<F>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>): Producer<G>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>): Producer<H>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>): Producer<I>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>): Producer<J>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>): Producer<K>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>): Producer<L>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>): Producer<M>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>): Producer<N>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>): Producer<O>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>): Producer<P>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>): Producer<Q>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>): Producer<R>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>): Producer<S>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>): Producer<T>;
// prettier-ignore
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(source: Producer<A> | Callbag<A>, o1: Operator<A, B>, o2: Operator<B, C>, o3: Operator<C, D>, o4: Operator<D, E>, o5: Operator<E, F>, o6: Operator<F, G>, o7: Operator<G, H>, o8: Operator<H, I>, o9: Operator<I, J>, o10: Operator<J, K>, o11: Operator<K, L>, o12: Operator<L, M>, o13: Operator<M, N>, o14: Operator<N, O>, o15: Operator<O, P>, o16: Operator<P, Q>, o17: Operator<Q, R>, o18: Operator<R, S>, o19: Operator<S, T>, o20: Operator<T, U>): Producer<U>;

export function pipe<T>(
  source: Producer<T> | Callbag<T>,
  ...ops: Array<Operator<any, any> | Consumer<any>>
): Producer<any> | void {
  let res: any = source;

  for (let i = 0; i < ops.length; i++) {
    res = ops[i](res);
  }

  return res;
}
