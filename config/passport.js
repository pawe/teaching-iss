var db = require('./db.js')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var passwordHasher = require('password-hash-and-salt')

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.withSQLFromFile('lecture1/user_auth.sql')
      .get({ $login: username }, function (err, row) {
        if (err) return done(err)
        console.log(row)
        if (!row) {
          return done(null, false, { message: 'Incorrect username.' })
        }

        passwordHasher(password)
          .verifyAgainst(row.hashedpassword, function (err, verified) {
            if (err) done(null, false, { message: 'Something went wrong' })
            if (!verified) {
              done(null, false, { message: 'Incorrect password' })
            } else {
              var user = { username: username }
              return done(null, user)
            }
          })
      })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.username)
})

passport.deserializeUser(function (username, done) {
  db.withSQLFromFile('lecture1/user_find.sql')
    .get({ $login: username }, function (err, row) {
      var user = {
        username: username,
        admin: row.admin
      }
      done(err, user)
    })
})

module.exports = passport
