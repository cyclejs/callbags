import { Suite } from 'benchmark';
import {
  options,
  runSuite,
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

const opts = {
  defer: true,
  onError: (e: any) => {
    e.currentTarget.failure = e.error;
  }
};

export const suite = new Suite(`scan -> scan ${options.size} integers`)
  .add(
    '@cycle/callbags',
    runCallbags(pipe(fromArray(arr), scan(add, 0), scan(passthrough, 0))),
    opts
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
    opts
  )
  .add(
    'xstream',
    runXStream(
      xs
        .fromArray(arr)
        .fold(add, 0)
        .fold(passthrough, 0)
    ),
    opts
  )
  .add(
    'rxjs',
    runRxJs(rxjsFrom(arr).pipe(rxjs.scan(add, 0), rxjs.scan(passthrough, 0))),
    opts
  )
  .add(
    'most',
    runMost(
      most
        .from(arr)
        .scan(add, 0)
        .scan(passthrough, 0)
    ),
    opts
  );

runSuite(suite);
