(function() {
	
	var brewmath,
		VERSION = "0.0.1",
		
		// check for nodeJS
  	hasModule = (typeof module !== 'undefined' && module.exports);
	
	function Brewmath() {}
	brewmath = function () { return new Brewmath(); }
	
	/* Generic Math Functions */
	
	function rational_tanh(x) {
    if( x < -3 ) {
			return -1;
    }
    else if( x > 3 ) {
			return 1;
    }
    else {
			return x * ( 27 + x * x ) / ( 27 + 9 * x * x );
    }
	}
	
	function approx_tanh(x) {
		return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
	}
	
	function maybe_tanh(arg) {
    var pos = Math.exp(arg);
    var neg = Math.exp(-arg);
    return (pos - neg) / (pos + neg);
	}
	
	function other_tanh(x){
     var e = Math.exp(2*x);
     return (e-1)/(e+1);
	}

	
	function tanh(x) {
		//return rational_tanh(x);
		//return approx_tanh(x);
		//return maybe_tanh(x);
		return other_tanh(x); // Using for now as it seems accurate and fast
	}
	
	/* ALCOHOL */
	
	// Calculate the alcohol percentage by volume
	brewmath.abv = function (og, fg) {
		return parseFloat(((og - fg) * 131).toFixed(2)); // ***TODO: test IE's compatibility with toFixed()
	}
	
	// Calculate the apparent degree of fermentation, returned as an integer, not decimal.
	//   i.e. 66 not 0.66
	brewmath.adf = function (og, fg) {
		return parseInt( (100 * ((og - fg) / (og-1))).toFixed(0) );
	}
	
	// Pitching rate (volume?)
	
	/* HOPS */
	
	// HBU
	brewmath.hbu = function(AApercent, weightOz) {
		return AApercent * weightOz;
	}
	
	// AAU (Alpha Acid Units)
	brewmath.aau = function(AApercent, weightOz, volGal) {
		return AApercent * weightOz / volGal;
	}
	
	// IBU (International Bittering Units)
	brewmath.ibu = function(AApercent, weightOz, volGal) {
		return AApercent * weightOz / volGal;
	}
	
	// Hop utilization % according to Rager
	brewmath.utilizationRager = function(timeBoiledMin) {
		//var util = 18.11 + 13.86 * hyptan[(timeBoiledMin - 31.32) / 18.27];
		var util = (18.11 + 13.86 * tanh( (timeBoiledMin - 31.32) / 18.27 )) / 100;
		
		return util;
	}
	
	// Hop bitterness according to the Rager formula
	brewmath.bitternessRager = function(gravity, volGal, AApercent, weightOz, timeBoiledMin) {
		var AAdecimal = parseFloat(AApercent) / 100;
		
		var util = brewmath.utilizationRager(timeBoiledMin);
		
		// According to Rager, if the gravity of the boil exceeds 1.050, there is a gravity adjustment (GA) to factor in:
		var gravityAdjustment = 0;
		if (gravity > 1.050) {
			gravityAdjustment = (gravity - 1.050) / 0.2;
		}
		
		var bu = (weightOz * util * AAdecimal * 7462) / (volGal * (1 + gravityAdjustment));
		
		return bu;
	}
	
	// Hop utilization % according to Tinseth
	brewmath.utilizationTinseth = function(gravity, timeBoiledMin) {
		var gravityUnits = parseFloat(gravity) - 1;
		
		return 1.65 * Math.pow(0.000125, gravityUnits) * (1 - Math.exp(-0.04 * timeBoiledMin)) / 4.15;
	}
	
	// Hop bitteress according to the Tinseth formula
	brewmath.bitternessTinseth = function(gravity, volGal, AApercent, weightOz, timeBoiledMin) {
		var AAdecimal = parseFloat(AApercent) / 100;
		
		// Get the utilization
		var util = brewmath.utilizationTinseth(gravity, timeBoiledMin);
		
		var mgPerLiter = AAdecimal * weightOz * 7490 / volGal;
		
		var bu = mgPerLiter * util;
		
		return bu;
	}
	
	/* COLOR */
	
	brewmath.SRMtoEBC = function(srm) {
		
	}
	
	brewmath.EBCtoSRM = function(ebc) {
		
	}
	
	/* KEGGING */
	
	
	
	/*===========================================
		Exposing Brewmath (stolen from moment.js)
	===========================================*/

	// CommonJS module is defined
	if (hasModule) {
	    module.exports = brewmath;
	}
	/*global ender:false */
	if (typeof ender === 'undefined') {
	    // here, `this` means `window` in the browser, or `global` on the server
	    // add `moment` as a global object via a string identifier,
	    // for Closure Compiler "advanced" mode
	    this['brewmath'] = brewmath;
	}
	/*global define:false */
	if (typeof define === "function" && define.amd) {
	    define("brewmath", [], function () {
	        return brewmath;
	    });
	}
}).call(this);