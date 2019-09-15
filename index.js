'use strict';

/**
 * Make sure that iteratee[n] will be invoked after min time(ms) from the iteratee[n - 1] invoking.
 * @param {number} time (ms)
 * @param {function} iteratee 
 * 
 * @example
 * const DelayIteratee = require('delay-iteratee');
 * 
 * const start_at = Date.now();
 * const coll = ['A', 'B', 'C', 'D', 'E', 'F'];
 * const iteratee = async item => console.log(`at ${Date.now() - start_at}ms ${item}`);
 * 
 * Promise.all(coll.map(DelayIteratee(200, iteratee)));
 * 
 * // or
 * const asyncLib = require('async');
 * asyncLib.eachLimit(coll, 3, DelayIteratee(200, iteratee));
 * 
 * // will print like:
 * at 0ms A
 * at 200ms B
 * at 400ms C
 * at 600ms D
 * at 800ms E
 * at 1000ms F
 */
function DelayIteratee(time, iteratee) {
  let start_at;
  let i = 0;

  return async function delayIteratee(...args) {
    if (!start_at) { start_at = Date.now() }

    let timeout = Math.max((i * time) - (Date.now() - start_at), 0);

    i++;

    if (timeout > 0) {
      await delay(timeout);
    }

    return iteratee(...args);
  }
}

/**
 * Delay after ms
 * @param {number} ms
 * 
 * @example
 * const { delay } = require('delay-iteratee');
 * doSomething();
 * await delay(200);
 * doSomethingElse(); 
 */
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

module.exports = DelayIteratee;
module.exports.delay = delay;