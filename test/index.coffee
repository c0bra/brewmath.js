brewmath = require("../brewmath")

chai = require("chai")
should = chai.should()

describe "abv", ->
  describe "with good arguments", ->
    it "returns the right alcohol percentage", ->
      abv = brewmath.abv(1.070, 1.020)
      abv.should.eql 6.55



describe "adf", ->
  describe "with good arguments", ->
    it "returns the right apparent degree of fermentation", ->
      adf = brewmath.adf(1.050, 1.017)
      adf.should.eql 66



describe "utilizationTinseth", ->
  describe "with good arguments", ->
    it "returns the right utilization percentage", ->
      gravity = 1.050
      timeBoiledMin = 60
      util = brewmath.utilizationTinseth(gravity, timeBoiledMin)
      
      # Trim the utilization down to 2 decimals to test it
      parseFloat(util.toFixed(2)).should.eql 0.23



describe "bitternessTinseth", ->
  describe "with good arguments", ->
    it "returns the right bitterness units", ->
      gravity = 1.050
      volGal = 5
      AApercent = 5.0
      weightOz = 2
      timeBoiledMin = 60
      bu = brewmath.bitternessTinseth(gravity, volGal, AApercent, weightOz, timeBoiledMin)
      
      # Round the bitterness units to test it
      parseFloat(bu.toFixed(1)).should.eql 34.6



describe "bitternessRager", ->
  describe "with good arguments", ->
    it "returns the right bitterness units", ->
      gravity = 1.050
      volGal = 5
      AApercent = 5.0
      weightOz = 2
      timeBoiledMin = 60
      bu = brewmath.bitternessRager(gravity, volGal, AApercent, weightOz, timeBoiledMin)
      
      # Round the bitterness units to test it
      Math.round(bu).should.eql 46




#======== Color Tests ========
describe "EBCtoSRM", ->
  describe "with 50", ->
    it "returns 25.4", ->
      srm = brewmath.EBCtoSRM(50)
      srm.should.eql 25.4



describe "EBCtoSRM", ->
  describe "with 0", ->
    it "returns 0", ->
      srm = brewmath.EBCtoSRM(0)
      srm.should.eql 0



describe "SRMtoEBC", ->
  describe "with 50", ->
    it "returns 98.5", ->
      srm = brewmath.SRMtoEBC(50)
      srm.should.eql 98.5



describe "SRMtoEBC", ->
  describe "with 0", ->
    it "returns 0", ->
      srm = brewmath.SRMtoEBC(0)
      srm.should.eql 0

