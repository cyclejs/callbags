import { Suite } from 'benchmark';
import { Stream } from 'xstream';
import { subscribe, Producer } from '../src/index';
import { Observable } from 'rxjs';
import * as most from 'most';

export const options = {
  size: 1000000,
  defer: true,
  onError: (e: any) => {
    e.currentTarget.failure = e.error;
  }
};

const noop = () => {};

function line(): string {
  return Array(53)
    .fill('-')
    .join('');
}

function padr(n: number, s: string): string {
  return Array(Math.max(n - s.length, 0))
    .fill(' ')
    .concat(s)
    .join('');
}

function padl(n: number, s: string): string {
  return (
    s +
    Array(Math.max(n - s.length, 0))
      .fill(' ')
      .join('')
  );
}

export function runSuite(s: Suite): Promise<void> {
  return new Promise(resolve => {
    s.on('start', function(this: any) {
      console.log(this.name);
      console.log(line());
    })
      .on('cycle', function(event: any) {
        const t = event.target;
        if (t.failure) {
          console.error(`${padl(16, t.name)}FAILED: ${t.failure}`);
        } else {
          const result =
            padl(16, t.name) +
            padr(13, t.hz.toFixed(2) + ' op/s') +
            ' \xb1' +
            padr(7, t.stats.rme.toFixed(2) + '%') +
            padr(15, ` (${t.stats.sample.length} samples)`);

          console.log(result);
        }
      })
      .on('complete', () => {
        console.log(line());
        resolve();
      })
      .run();
  });
}

function mkObserver(deffered: any) {
  return {
    next: noop,
    complete: () => deffered.resolve(),
    error: (e: any) => {
      deffered.benchmark.emit({ type: 'error', error: e });
      deffered.resolve(e);
    }
  };
}

export function runXStream(stream: () => Stream<any>): (fn: any) => void {
  return f => stream().addListener(mkObserver(f));
}

export function runCallbags(source: () => Producer<any>): (fn: any) => void {
  return deferred => {
    try {
      subscribe(noop, (e: any) => {
        if (e) {
          deferred.benchmark.emit({ type: 'error', error: e });
          deferred.resolve(e);
        } else {
          deferred.resolve();
        }
      })(source());
    } catch (e) {
      console.error(e);
    }
  };
}

export function runRxJs(observable: () => Observable<any>): (fn: any) => void {
  return f => observable().subscribe(mkObserver(f));
}

export function runMost(stream: () => most.Stream<any>): (fn: any) => void {
  return f => stream().subscribe(mkObserver(f));
}
