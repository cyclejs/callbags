import { Suite } from 'benchmark';
import { options, runCallbags, runXStream, runRxJs, runMost } from './helpers';

import {
  fromArray,
  map,
  scan,
  filter,
  combineWith,
  pipe,
  merge
} from '../src/index';
import xs from 'xstream';
import { from as rxjsFrom, merge as rxjsMerge, combineLatest } from 'rxjs';
import * as rxjs from 'rxjs/operators';
import * as most from 'most';

const arr = Array(options.size)
  .fill(0)
  .map(() => Math.sin(Math.random() * 100000));

const isPositive = (x: number) => x > 0;
const isNegative = (x: number) => x < 0;
const add = (x: number, y: number) => x + y;
const renderArray = (arr: any[]) => ({ label: arr[0], count: [1] });
const renderArgs = (x: any, y: any) => ({ label: x, count: y });

export const dataflow = new Suite(`dataflow for ${options.size} source events`)
  .add(
    '@cycle/callbags',
    runCallbags(() => {
      const source = fromArray(arr);
      const inc = pipe(
        source,
        filter(isPositive),
        map(() => +1)
      );
      const dec = pipe(
        source,
        filter(isNegative),
        map(() => -1)
      );
      const count = pipe(merge(inc, dec), scan(add, 0));
      const label = fromArray(['initial', 'Count is ']);

      return combineWith(renderArgs, label, count);
    }),
    options
  )
  .add(
    'xstream',
    runXStream(() => {
      const source = xs.fromArray(arr);
      const inc = source.filter(isPositive).mapTo(+1);
      const dec = source.filter(isNegative).mapTo(-1);
      const count = xs.merge(inc, dec).fold(add, 0);
      const label = xs.of('initial', 'Count is ');

      return xs.combine(label, count).map(renderArray);
    }),
    options
  )
  .add(
    'rxjs',
    runRxJs(() => {
      const source = rxjsFrom(arr);
      const inc = source.pipe(rxjs.filter(isPositive), rxjs.mapTo(+1));
      const dec = source.pipe(rxjs.filter(isNegative), rxjs.mapTo(-1));
      const count = rxjsMerge(inc, dec).pipe(rxjs.scan(add, 0));
      const label = rxjsFrom(['initial', 'Count is ']);

      return combineLatest(label, count, renderArgs);
    }),
    options
  )
  .add(
    'most',
    runMost(() => {
      const source = most.from(arr);
      const inc = source.filter(isPositive).map(() => +1);
      const dec = source.filter(isNegative).map(() => -1);
      const count = most.merge(inc, dec).scan(add, 0);
      const label = most.from(['initial', 'Count is ']);

      return most.combine(renderArgs, label, count);
    }),
    options
  );
