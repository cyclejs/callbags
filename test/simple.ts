import { fromArray, map, forEach, pipe } from '../src/index';

pipe(
  fromArray([1, 2, 3, 4, 5, 6, 7, 8]),
  map(x => x * x),
  map(x => x.toString()),
  forEach(print)
);

function print<A>(arg: A): void {
  console.log(arg);
}
