var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var fs = require('fs')

router.get('/schema', function (req, res, next) {
  var schema = ''
  db.each('SELECT sql FROM sqlite_master WHERE type="table" OR type="view"',
    function (err, row) {
      if (err) return next(err)
      schema += row.sql + '\n'
    },
    function () {
      res.type('text/plain')
      res.send(schema)
    }
    )
})

router.get('/version', function (req, res, next) {
  db.get('SELECT sqlite_version() AS version',
    function (err, row) {
      if (err) return next(err)
      res.type('text/plain')
      res.send(row.version)
    }
  )
})

router.get('/logs', function (req, res, next) {
  var logfile = db.filename + '.log'
  res.type('text/plain')
  fs.createReadStream(logfile, { encoding: 'utf8' }).pipe(res)
})

router.get('/download', function (req, res, next) {
  res.setHeader('Content-disposition', 'attachment; filename=' + db.filename)
  res.type('application/x-sqlite3')
  fs.createReadStream(db.filename).pipe(res)
})

module.exports = router
