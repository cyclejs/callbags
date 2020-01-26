import * as fc from 'fast-check';

describe('mocha test', () => {
  it('simple test', () => {
    fc.assert(fc.property(fc.string(), text => text.indexOf(text) === 0));
  });
});
