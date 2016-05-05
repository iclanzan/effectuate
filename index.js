'use strict'

var isNumber = require('is-number')
var meow = require('meow')

var write = function (value) {
  if (value !== undefined) {
    console.log(value)
  }
  return value
}

var runner = function (job, args) {
  return function (extra) {
    var allArgs = extra
      ? [isNumber(extra) ? +extra : extra].concat(args)
      : args

    var result = job.apply(null, allArgs)

    if (result && typeof result.then === 'function') {
      result.then(write)
    } else {
      write(result)
    }

    return result
  }
}

module.exports = function (help) {
  var cli = meow(help)
  var script = cli.input[0]

  if (!script) {
    cli.showHelp()
  }

  var task = require(script)
  var input = cli.input.slice(1).concat(
    Object.keys(cli.flags).length ? cli.flags : []
  )

  return runner(task, input)
}
