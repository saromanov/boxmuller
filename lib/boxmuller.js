
//Sampling from Box-muller process
"use strict";

module.exports = module = function (mu, sigma) {
    var n = arguments[2] === undefined ? 1 : arguments[2];

    if (n === 0 || !Number.isInteger(n)) {
        return;
    }
    if (n === 1) {
        return box_muller(mu, sigma).first;
    }

    var result = [];
    var count = 0;
    while (true) {
        var items = box_muller(mu, sigma);
        var first = items.first;
        result.push(first);
        count += 1;
        if (count === n) {
            return result;
        }

        var second = items.second;
        result.push(second);
        count += 1;
        if (count === n) {
            return result;
        }
    }
    return box_muller(mu, sigma);
};

var box_muller = function box_muller(mu, sigma) {
    var U1 = Math.random();
    var U2 = Math.random();
    var Z0 = box_muller_step(Math.cos, U1, U2);
    var Z1 = box_muller_step(Math.sin, U1, U2);
    var result1 = mu + Z0 * sigma;
    var result2 = mu + Z1 * sigma;
    return { first: result1, second: result2 };
};

var box_muller_step = function box_muller_step(func, U1, U2) {
    return Math.sqrt(-2 * Math.log(U1)) * func(2 * Math.PI * U2);
};