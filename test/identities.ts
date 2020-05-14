import { pipe, subscribe, empty, never } from '../src/index';

describe('idendity tests', () => {
  it('empty() should not deliver data and complete', done => {
    pipe(
      empty(),
      subscribe(() => done('should not deliver data'), done)
    );
  });

  it('never() should not deliver data nor complete', done => {
    pipe(
      never(),
      subscribe(
        () => done('should not deliver data'),
        () => done('should not complete')
      )
    );
    setTimeout(done, 200);
  });
});
