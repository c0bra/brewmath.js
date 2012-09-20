var should = require('should');
var brewmath = require('../brewmath');

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

describe('utilizationTinseth', function() {
	describe('with good arguments', function() {
		it('returns the right utilization percentage', function() {
			var gravity = 1.050;
			var timeBoiledMin = 60;
			
			var util = brewmath.utilizationTinseth(gravity, timeBoiledMin);
			
			// Trim the utilization down to 2 decimals to test it
			parseFloat(util.toFixed(2)).should.eql(0.23);
		});
	});
});

describe('bitternessTinseth', function() {
	describe('with good arguments', function() {
		it('returns the right bitterness units', function() {
			var gravity = 1.050;
			var volGal = 5;
			var AApercent = 5.0;
			var weightOz = 2;
			var timeBoiledMin = 60;
			
			var bu = brewmath.bitternessTinseth(gravity, volGal, AApercent, weightOz, timeBoiledMin);
			
			// Round the bitterness units to test it
			parseFloat(bu.toFixed(1)).should.eql(34.6);
		});
	});
});

describe('bitternessRager', function() {
	describe('with good arguments', function() {
		it('returns the right bitterness units', function() {
			var gravity = 1.050;
			var volGal = 5;
			var AApercent = 5.0;
			var weightOz = 2;
			var timeBoiledMin = 60;
			
			var bu = brewmath.bitternessRager(gravity, volGal, AApercent, weightOz, timeBoiledMin);
			
			// Round the bitterness units to test it
			Math.round(bu).should.eql(46);
		});
	});
});

/*======== Color Tests ========*/

describe('EBCtoSRM', function() {
	describe('with 50', function() {
		it('returns 25.4', function() {
						
			var srm = brewmath.EBCtoSRM(50);
			
			srm.should.eql(25.4);
		});
	});
});

describe('EBCtoSRM', function() {
	describe('with 0', function() {
		it('returns 0', function() {
						
			var srm = brewmath.EBCtoSRM(0);
			
			srm.should.eql(0);
		});
	});
});

describe('SRMtoEBC', function() {
	describe('with 50', function() {
		it('returns 98.5', function() {
						
			var srm = brewmath.SRMtoEBC(50);
			
			srm.should.eql(98.5);
		});
	});
});

describe('SRMtoEBC', function() {
	describe('with 0', function() {
		it('returns 0', function() {
						
			var srm = brewmath.SRMtoEBC(0);
			
			srm.should.eql(0);
		});
	});
});