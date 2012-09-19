var should = require('should');
var brewmatch = require('../lib/main');

describe('brewmath', function() {
	describe('with no arguments', function() {
		it('returns an empty array', function() {
			var result = brewmath();
			result.should.eql([]);
		});
	});
});