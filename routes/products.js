var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var async = require('async')

router.get('/', function (req, res, next) {
  async.series({
    baugruppen: function (cb) {
      db.all('SELECT Baugruppennummer, Bezeichnung FROM Baugruppen;',
        function (err, result) {
          if (err) return cb(err)
          cb(null, result)
        })
    },
    multilevel_bom: function (cb) {
      db.withSQLFromFile('hw3/multilevel_bom.sql')
        .all({ $assembly: req.query.baugruppe }, function () {
          cb(null, arguments)
        })
    },
    teile: function (cb) {
      db.all('SELECT Teilnummer, Bezeichnung FROM Teile;',
      function (err, result) {
        if (err) return cb(err)
        cb(null, result)
      })
    },
    part_in_assembly: function (cb) {
      db.withSQLFromFile('hw3/part_in_assembly.sql')
        .all({
          $part: req.query.teil
        },
        function () { cb(null, arguments) }
        )
    },
    partcount_in_assembly: function (cb) {
      db.withSQLFromFile('hw3/partcount_in_assembly.sql')
        .get({
          $part: parseInt(req.query.teil, 10),
          $assembly: parseInt(req.query.baugruppe, 10)
        },
        function () {
          cb(null, arguments)
        })
    },
    quantitative_bom: function (cb) {
      db.withSQLFromFile('hw3/quantitative_bom.sql')
        .all({ $assembly: req.query.baugruppe }, function () {
          cb(null, arguments)
        })
    },
    parts_with_production_data: function (cb) {
      db.withSQLFromFile('hw3/parts_with_production_data.sql')
        .all(function () { cb(null, arguments) })
    },
    parts_without_production_data: function (cb) {
      db.withSQLFromFile('hw3/parts_without_production_data.sql')
        .all(function () { cb(null, arguments) })
    },
    part_average_production_time: function (cb) {
      db.withSQLFromFile('hw3/parts_average_production_time.sql')
        .all(function () { cb(null, arguments) })
    }
  },
  function (err, results) {
    if (err) return next(err)

    res.render('products', {
      title: 'Produktstruktur',
      user: req.user,
      selected_baugruppe: req.query.baugruppe,
      baugruppen: results.baugruppen,
      selected_teil: req.query.teil,
      teile: results.teile,
      multilevel_bom_error: results.multilevel_bom[0] && results.multilevel_bom[0].message,
      multilevel_bom: results.multilevel_bom[1],
      part_in_assembly_error: results.part_in_assembly[0] && results.part_in_assembly[0].message,
      part_in_assembly: results.part_in_assembly[1],
      partcount_in_assembly_error: results.partcount_in_assembly[0] && results.partcount_in_assembly[0].message,
      partcount_in_assembly: results.partcount_in_assembly[1] && results.partcount_in_assembly[1].quantity,
      quantitative_bom_error: results.quantitative_bom[0] && results.quantitative_bom[0].message,
      quantitative_bom: results.quantitative_bom[1],
      parts_with_production_data_error: results.parts_with_production_data[0] && results.parts_with_production_data[0].message,
      parts_with_production_data: results.parts_with_production_data[1],
      parts_without_production_data_error: results.parts_without_production_data[0] && results.parts_without_production_data[0].message,
      parts_without_production_data: results.parts_without_production_data[1],
      part_average_production_time_error: results.part_average_production_time[0] && results.part_average_production_time[0].message,
      part_average_production_time: results.part_average_production_time[1]
    })
  })
})

router.post('/migration_average_production_times', function (req, res, next) {
  db.withSQLFromFile('hw3/migration_up_average_production_time.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/products')
    })
})

router.post('/migration_structure', function (req, res, next) {
  db.withSQLFromFile('hw3/migration_up_product_structure.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/products')
    })
})

router.post('/migrationdown', function (req, res, next) {
  db.withSQLFromFile('hw3/migration_down.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/products')
    })
})

module.exports = router
