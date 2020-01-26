# @cycle/callbags

This is the set of [callbags](https://github.com/callbag/callbag/blob/master/readme.md) that will most likely be used in the next version of Cycle.js. They are written in TypeScript and export ES modules to allow for tree shaking.

## Building

This project uses [`pnpm`](https://pnpm.js.org/), other package managers might work, but only pnpm has a lockfile that pins dependencies. To build run:

```
pnpm install
pnpm run build
```

## Implemented operators

Currently, the following set of operators is implemented, others might follow. Note that this repo is not designed to become the "official" home of callbags, so after a basic set is implemented it is very unlikely that further operators will be added. This is no problem in practise as all of the callbags here adhere to the spec, so you can easily mix and match them with any callbag operator out there.

### Factories

- [`fromArray`](./src/from.ts)
- [`fromPromise`](./src/from.ts)
- [`from`](./src/from.ts)
- [`of`](./src/from.ts)

### Operators

- [`map`](./src/map.ts)
- [`take`](./src/take.ts)
- [`first`](./src/take.ts)

### Sinks

- [`forEach`](./src/forEach.ts)

### Helpers

- [`pipe`](./src/pipe.ts)
