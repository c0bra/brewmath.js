(function() {
	
	var brewmath,
		VERSION = "0.0.1",
		
		// check for nodeJS
  	hasModule = (typeof module !== 'undefined' && module.exports);
	
	function Brewmath() {}
	brewmath = function () { return new Brewmath(); }
	
	// Hop utilization table
	
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
	
	// Hop bitterness
	
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
	
	// Hop utilization % according to the Rager formula
	brewmath.utilizationRager = function() {
		
	}
	
	// Hop utilization % according to the Rager formula
	brewmath.utilizationTinseth = function(gravity, timeBoiledMin) {
		var gravityUnits = parseFloat(gravity) - 1;
		
		return 1.65 * Math.pow(0.000125, gravityUnits) * (1 - Math.exp(-0.04 * timeBoiledMin)) / 4.15;
	}
	
	brewmath.bitternessTinseth = function(gravity, volGal, AApercent, weightOz, timeBoiledMin) {
		var AAdecimal = parseFloat(AApercent) / 100;
		
		// Get the utilization
		var util = brewmath.utilizationTinseth(gravity, timeBoiledMin);
		
		console.log(util);
		
		var mgPerLiter = AAdecimal * weightOz * 7490 / volGal;
		
		var bu = mgPerLiter * util;
		
		return bu;
	}
	
	/* COLOR */
	
	brewmath.SRMtoEBC = function(srm) {
		
	}
	
	brewmath.EBCtoSRM = function(ebc) {
		
	}
	
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