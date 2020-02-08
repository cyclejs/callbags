import { runSuite } from './helpers';
import { fold } from './fold';
import { dataflow } from './dataflow';

[fold, dataflow].reduce(
  (acc, curr) => acc.then(() => runSuite(curr)),
  Promise.resolve()
);
