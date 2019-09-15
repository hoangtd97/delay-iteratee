'use strict';

const assert = require('assert');
const DelayIteratee = require('.');
const asyncLib = require('async');
const { delay } = require('.');

describe('DelayIteratee', () => {

  const coll = ['A', 'B', 'C', 'D', 'E', 'F'];
  const delayTime = 200;
  const toleranceTime = delayTime * 0.1;

  function testResult (result, delayTime, toleranceTime) {
    for (let i in result) {
      const { time, value } = result[i];

      assert.ok(value === coll[i].toLowerCase());
      assert.ok(time >= (delayTime * i) - toleranceTime && time <= (delayTime * i) + toleranceTime);
    }
  }

  it ('should work with Promise.all()', async () => {
    const start_at = Date.now();
    const iteratee = async item => {
      let time = Date.now() - start_at;
      // console.log(`at ${time}ms do ${item}`);

      await delay(300);

      return { time, value : item.toLowerCase() };
    };

    const result = await Promise.all(coll.map(DelayIteratee(delayTime, iteratee)));

    assert.ok(result.length === coll.length);

    testResult(result, delayTime, toleranceTime);
  });

  it ('should work with asyncLib.eachLimit()', async () => {
    const result = [];
    const start_at = Date.now();
    const iteratee = async item => {
      let time = Date.now() - start_at;
      // console.log(`at ${time}ms do ${item}`);

      await delay(300);

      result.push({ time, value : item.toLowerCase() });
    };

    await asyncLib.eachLimit(coll, 3, DelayIteratee(delayTime, iteratee));

    assert.ok(result.length === coll.length);

    testResult(result, delayTime, toleranceTime);
  });

})