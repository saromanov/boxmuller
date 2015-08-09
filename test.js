var assert = require('assert');
var boxmuller = require('./lib/boxmuller');

it('should return n numbers from sample', function(){
    var result = boxmuller(0,1,10);
    assert.equal(result.length, 10);
});
