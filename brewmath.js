(function() {
	
	var brewmath,
		VERSION = "0.0.1",
		
		// check for nodeJS
  	hasModule = (typeof module !== 'undefined' && module.exports);
	
	function Brewmath() {}
	brewmath = function () { return new Brewmath(); }
	
	// Calculate the alcohol percentage by volume
	brewmath.abv = function (og, fg) {
		return parseFloat(((og - fg) * 131).toFixed(2)); // ***TODO: test IE's compatibility with toFixed()
	}
	
	// Calculate the apparent degree of fermentation, returned as an integer, not decimal.
	//   i.e. 66 not 0.66
	brewmath.adf = function (og, fg) {
		return parseInt( (100 * ((og - fg) / (og-1))).toFixed(0) );
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