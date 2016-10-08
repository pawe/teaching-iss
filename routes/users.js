var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var passport = require('passport')
var password = require('password-hash-and-salt')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('User settings could be here.')
})

router.get('/login', function (req, res, next) {
  res.render('login', { flash: '' })
})

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }
  )
)

router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

router.get('/register', function (req, res, next) {
  res.render('register')
})

router.post('/register', function (req, res, next) {
  req.check('username', 'Hanlde length should be between 3 and 16 chararcters.')
    .len(3, 16)
  req.check('password', 'Passwort length between 6 and 24 chararcters.')
    .len(6, 24)

  password(req.body.password)
    .hash(function (err, hash) {
      if (err) return next(err)
      console.log(hash)
      db.withSQLFromFile('lecture1/user_add.sql')
        .run(
        {
          $login: req.body.username,
          $hashedpassword: hash
        },
          function (err) {
            if (err) return next(err)
            res.redirect('/users/login')
          }
        )
    }
  )
})

router.post('/changepassword', function (req, res, next) {
  // TODO: allow passwords to be changed
})

module.exports = router
