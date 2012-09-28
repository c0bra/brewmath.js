(->
  brewmath = undefined
  VERSION = "0.0.1"

  # check for nodeJS
  hasModule = (typeof module isnt "undefined" and module.exports)

  Brewmath = ->
  brewmath = ->
    new Brewmath()

  #
  # Generic Math Functions
  #

  rational_tanh = (x) ->
    if x < -3
      -1
    else if x > 3
      1
    else
      x * (27 + x * x) / (27 + 9 * x * x)

  approx_tanh = (x) ->
    (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))

  maybe_tanh = (arg) ->
    pos = Math.exp(arg)
    neg = Math.exp(-arg)
    (pos - neg) / (pos + neg)

  other_tanh = (x) ->
    e = Math.exp(2 * x)
    (e - 1) / (e + 1)

  tanh = (x) ->
    #return rational_tanh(x);
    #return approx_tanh(x);
    #return maybe_tanh(x);
    # Using for now as it seems accurate and fast
    other_tanh x

  #
  # Mash
  #

  brewmath.StrikeTemperature = (grainWeight, grainTemp, targetTemp, targetRatio) ->
    (0.2 / targetRatio) * (targetTemp - grainTemp) + targetTemp
    

  #
  # Alcohol
  #

  # Calculate the alcohol percentage by volume
  brewmath.abv = (og, fg) ->
    parseFloat ((og - fg) * 131).toFixed(2) # ***TODO: test IE's compatibility with toFixed()

  # Calculate the apparent degree of fermentation, returned as an integer, not decimal.
  #  i.e. 66 not 0.66
  brewmath.adf = (og, fg) ->
    parseInt (100 * ((og - fg) / (og - 1))).toFixed(0)

  #
  # Yeast
  #

  # Pitching rate (volume?)

  #
  # Hops
  #

  # HBU
  brewmath.hbu = (AApercent, weightOz) ->
    AApercent * weightOz

  # AAU (Alpha Acid Units)
  brewmath.aau = (AApercent, weightOz, volGal) ->
    AApercent * weightOz / volGal

  # IBU (International Bittering Units)
  brewmath.ibu = (AApercent, weightOz, volGal) ->
    AApercent * weightOz / volGal

  #  Hop utilization % according to Rager
  brewmath.utilizationRager = (timeBoiledMin) ->
    util = (18.11 + 13.86 * tanh((timeBoiledMin - 31.32) / 18.27)) / 100
    util

  # Hop bitterness according to the Rager formula
  brewmath.bitternessRager = (gravity, volGal, AApercent, weightOz, timeBoiledMin) ->
    AAdecimal = parseFloat(AApercent) / 100
    util = brewmath.utilizationRager(timeBoiledMin)
    gravityAdjustment = 0
    gravityAdjustment = (gravity - 1.050) / 0.2  if gravity > 1.050
    bu = (weightOz * util * AAdecimal * 7462) / (volGal * (1 + gravityAdjustment))
    bu

  # Hop utilization % according to Tinseth
  brewmath.utilizationTinseth = (gravity, timeBoiledMin) ->
    gravityUnits = parseFloat(gravity) - 1
    1.65 * Math.pow(0.000125, gravityUnits) * (1 - Math.exp(-0.04 * timeBoiledMin)) / 4.15

  # Hop bitteress according to the Tinseth formula
  brewmath.bitternessTinseth = (gravity, volGal, AApercent, weightOz, timeBoiledMin) ->
    AAdecimal = parseFloat(AApercent) / 100
    util = brewmath.utilizationTinseth(gravity, timeBoiledMin)
    mgPerLiter = AAdecimal * weightOz * 7490 / volGal
    bu = mgPerLiter * util
    bu

  #
  # COLOR
  #

  brewmath.SRMtoEBC = (srm) ->
    srm * 1.97

  brewmath.EBCtoSRM = (ebc) ->
    ebc * .508

  #
  # Exposing Brewmath (stolen from moment.js)
  #

  module.exports = brewmath  if hasModule
  this["brewmath"] = brewmath  if typeof ender is "undefined"
  if typeof define is "function" and define.amd
    define "brewmath", [], ->
      brewmath

).call this