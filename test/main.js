var should = require('should');
var brewmath = require('../brewmath');

console.log(brewmath);

describe('abv', function() {
	describe('with good arguments', function() {
		it('returns the right alcohol percentage', function() {
			var abv = brewmath.abv(1.070, 1.020);
			abv.should.eql(6.55);
		});
	});
});

describe('adf', function() {
	describe('with good arguments', function() {
		it('returns the right apparent degree of fermentation', function() {
			var adf = brewmath.adf(1.050, 1.017);
			adf.should.eql(66);
		});
	});
});