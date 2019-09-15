[![Build Status](https://travis-ci.org/hoangtd97/delay-iteratee.svg?branch=master)](https://travis-ci.org/hoangtd97/delay-iteratee)
[![Coverage Status](https://coveralls.io/repos/github/hoangtd97/delay-iteratee/badge.svg?branch=master)](https://coveralls.io/github/hoangtd97/delay-iteratee?branch=master)

<a id="DelayIteratee"></a>

## DelayIteratee(time, iteratee)
Make sure that iteratee[n] will be invoked after min time(ms) from the iteratee[n - 1] invoking.

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | (ms) |
| iteratee | <code>function</code> |  |

**Example**  
```js
const DelayIteratee = require('delay-iteratee');

const start_at = Date.now();
const coll = ['A', 'B', 'C', 'D', 'E', 'F'];
const iteratee = async item => console.log(`at ${Date.now() - start_at}ms ${item}`);

Promise.all(coll.map(DelayIteratee(200, iteratee)));

// or
const asyncLib = require('async');
asyncLib.eachLimit(coll, 3, DelayIteratee(200, iteratee));

// will print like:
at 2ms A
at 201ms B
at 400ms C
at 603ms D
at 802ms E
at 1005ms F
```
