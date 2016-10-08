var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var expressValidator = require('express-validator')
var flash = require('express-flash')

// authenticiation
var passport = require('./config/passport.js')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))

// static files
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
// make static accessable through '/public', in order to make
// them work in gitlab and when served by the application
app.use('/public', express.static(path.join(__dirname, 'public')))

// for dynamic content
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET || 'f3$$s23uidsnY',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

// routes
var routes = require('./routes/index')
var users = require('./routes/users')
var organization = require('./routes/organization')
var assignments = require('./routes/assignments')
var database = require('./routes/database')
var solutions = require('./routes/solutions')
var production = require('./routes/production')
var products = require('./routes/products')
var projects = require('./routes/projects')


app.use('/', routes)
app.use('/users', users)
app.use('/org', organization)
app.use('/assignments', assignments)
app.use('/database', database)
app.use('/solutions', solutions)
app.use('/production', production)
app.use('/products', products)
app.use('/projects', projects)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
