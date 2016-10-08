'use strict'

var express = require('express')
var router = express.Router()

var db = require('../config/db.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'IIS Übung',
    user: req.user
  })
})

/* GET energie page */
router.get('/energie', function (req, res, next) {
  /*
    per default this read the sql on each request, because browserrefresh should
    reload the sql. Reason: easier to work on sql files.
  */
  db.withSQLFromFile('db/energie_flow.sql')
    .all(function (err, result) {
      if (err) return next(err)

      // maybe restructure result data...
      res.render('sankey', { data: result })
    })
})

module.exports = router
