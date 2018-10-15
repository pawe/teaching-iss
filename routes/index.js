'use strict'

var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'IIS Übung',
    user: req.user
  })
})

module.exports = router
