# @cycle/callbags

![Build](https://github.com/cyclejs/callbags/workflows/Build/badge.svg) [![codecov](https://codecov.io/gh/cyclejs/callbags/branch/master/graph/badge.svg)](https://codecov.io/gh/cyclejs/callbags) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is the set of [callbags](https://github.com/callbag/callbag/blob/master/readme.md) that will most likely be used in the next version of Cycle.js. They are written in TypeScript and export ES modules to allow for tree shaking. Also, the implementation is specifically tailored to the Cycle.js use case, so all of them are push-only. Using them with sink or operators that try to pull the sources here will most likely lead to bugs und weird behavior.

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
- [`create`](./src/identities.ts)
- [`never`](./src/identities.ts)
- [`empty`](./src/identities.ts)
- [`throwError`](./src/identities.ts)
- [`merge`](./src/merge.ts)
- [`combine`](./src/combine.ts)
- [`combineWith`](./src/combine.ts)
- [`makeSubject`](./src/subject.ts)
- [`makeAsyncSubject`](./src/subject.ts)

### Operators

- [`map`](./src/map.ts)
- [`scan`](./src/map.ts)
- [`take`](./src/take.ts)
- [`first`](./src/take.ts)
- [`filter`](./src/filter.ts)
- [`startWith`](./src/startWith.ts)
- [`skip`](./src/skip.ts)
- [`last`](./src/skip.ts)
- [`flatten`](./src/flatten.ts)
- [`sample`](./src/sample.ts)
- [`sampleWith`](./src/sample.ts)
- [`sampleCombine`](./src/sample.ts)
- [`multicast`](./src/multicast.ts)

### Sinks

- [`subscribe`](./src/subscribe.ts)

### Helpers

- [`pipe`](./src/pipe.ts)
