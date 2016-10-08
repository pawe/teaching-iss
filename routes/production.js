var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var async = require('async')
var fs = require('fs')
var csv = require('fast-csv')


// if this is needed in a third place, deduplicate it
function insertData (testdata, sql, callback) {
  // just a _quick and dirty_ replace.
  // it's one of the things you should never do in a production system
  // because it opens up the system for sql injections
  // right way would be to execute each insert with driver and use transaction
  // this would make the assignment more complicated to achieve
  async.each(testdata, function (testdata, cb) {
    var transaction = sql
    Object.keys(testdata).forEach(function (key) {
      transaction = transaction.split(key).join(testdata[key] ? "'" + testdata[key] + "'" : 'null')
    })

    db.exec(transaction, function (err) {
      if (err) return cb(err)
      cb()
    })
  },
  callback
  )
}

router.get('/', function (req, res, next) {
  async.series({
    inCharge: function (cb) {
      db.withSQLFromFile('hw2/machines_list_person_in_charge.sql')
        .all(function () {
          cb(null, arguments) // again, not nice
        })
    },
    machines: function (cb) {
      db.withSQLFromFile('hw2/machines_all.sql')
        .all(function () {
          cb(null, arguments)
        })
    },
    toolsOnMachine: function (cb) {
      db.withSQLFromFile('hw2/machines_tools_used.sql')
        .all({ $machineNumber: req.query.machineNumber }, function () {
          cb(null, arguments)
        })
    },
    sites: function (cb) {
      db.withSQLFromFile('hw2/machines_sites.sql')
        .all({ $machineNumber: req.query.machineNumber }, function () {
          cb(null, arguments)
        })
    },
    movements: function (cb) {
      db.withSQLFromFile('hw2/machine_movements.sql')
        .all(function () {
          cb(null, arguments)
        })
    },
    operatingTimes: function (cb) {
      db.withSQLFromFile('hw2/tools_operating_time.sql')
        .all(function () {
          cb(null, arguments)
        })
    },
    remainingLife: function (cb) {
      db.withSQLFromFile('hw2/tools_remaining_life.sql')
        .all(function () {
          cb(null, arguments)
        })
    }
  },
  function (err, results) {
    if (err) return next(err)
    console.log(results)
    res.render('production', {
      title: 'Fertigungsdaten',
      user: req.user,
      inCharge_error: results.inCharge[0] && results.inCharge[0].message,
      inCharge: results.inCharge[1],
      machines_error: results.machines[0] && results.machines[0].message,
      machines: results.machines[1],
      selected_machine: req.query.machineNumber,
      toolsOnMachine_error: results.toolsOnMachine[0] && results.toolsOnMachine[0].message,
      toolsOnMachine: results.toolsOnMachine[1],
      sites_error: results.sites[0] && results.sites[0].message,
      sites: results.sites[1],
      movements_error: results.movements[0] && results.movements[0].message,
      movements: results.movements[1],
      operatingTimes_error: results.operatingTimes[0] && results.operatingTimes[0].message,
      operatingTimes: results.operatingTimes[1],
      remainingLife_error: results.remainingLife[0] && results.remainingLife[0].message,
      remainingLife: results.remainingLife[1]
    })
  })
})


router.post('/migrationdown', function (req, res, next) {
  db.withSQLFromFile('hw2/migration_down.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/production')
    })
})

router.post('/migrationup', function (req, res, next) {
  db.withSQLFromFile('hw2/migration_up.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/production')
    })
})

router.post('/dataintake', function (req, res, next) {
  var testdataProduction = []
  csv.fromPath('solutions/hw2/testdata.csv', { headers: true })
    .on('data', function (data) {
      testdataProduction.push(data)
    })
    .on('end', function () {
      var sqlTemplate = fs.readFileSync('solutions/hw2/data_intake.sql', 'utf8')
      insertData(testdataProduction, sqlTemplate, function (err) {
        if (err) return next(err)
        res.redirect('/production')
      })
    })
})

module.exports = router
