{exec} = require 'child_process'
task 'build', 'Build project from brewmath.coffee to build/*.js', ->
  exec 'coffee --compile --output build/ brewmath.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr