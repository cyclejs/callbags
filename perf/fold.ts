import { Suite } from 'benchmark';
import {
  options,
  runXStream,
  runCallbags,
  runCallbagBasics,
  runRxJs,
  runMost
} from './helpers';

import { pipe, fromArray, scan } from '../src/index';
import xs from 'xstream';
import { from as rxjsFrom } from 'rxjs';
import * as rxjs from 'rxjs/operators';
import * as most from 'most';
import * as basics from 'callbag-basics';

const arr = Array(options.size)
  .fill(0)
  .map((_, i) => i);

const add = (x: number, y: number) => x + y;
const passthrough = <T>(_: any, x: T) => x;

export const fold = new Suite(`scan -> scan ${options.size} integers`)
  .add(
    '@cycle/callbags',
    runCallbags(pipe(fromArray(arr), scan(add, 0), scan(passthrough, 0))),
    options
  )
  .add(
    'callbag-basics',
    runCallbagBasics(
      basics.pipe(
        fromArray(arr),
        basics.scan(add, 0),
        basics.scan(passthrough, 0)
      )
    ),
    options
  )
  .add(
    'xstream',
    runXStream(
      xs
        .fromArray(arr)
        .fold(add, 0)
        .fold(passthrough, 0)
    ),
    options
  )
  .add(
    'rxjs',
    runRxJs(rxjsFrom(arr).pipe(rxjs.scan(add, 0), rxjs.scan(passthrough, 0))),
    options
  )
  .add(
    'most',
    runMost(
      most
        .from(arr)
        .scan(add, 0)
        .scan(passthrough, 0)
    ),
    options
  );
