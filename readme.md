<a id="DelayIteratee"></a>

## DelayIteratee(time, iteratee)
Make sure that iteratee[n] will be invoked after time(ms) from the iteratee[n - 1] invoking.

**Kind**: global function  

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
at 0ms A
at 200ms B
at 400ms C
at 600ms D
at 800ms E
at 1000ms F
```
<a id="delay"></a>

## delay(ms)
Delay after ms

**Kind**: global function  

| Param | Type |
| --- | --- |
| ms | <code>number</code> | 

**Example**  
```js
const { delay } = require('delay-iteratee');
doSomething();
await delay(200);
doSomethingElse(); 
```
