var sqlite3 = require('sqlite3').verbose()
var fs = require('fs')

// every time this application is started it stores its database in database_backups
var dbname = 'database_backups/iis.' + Date.now() + '.db'

// set database
var db = new sqlite3.Database(process.env.SQLITE_PATH || dbname)

db.run('PRAGMA foreign_keys = ON;')

var solutionFolder = process.env.SOLUTIONS_FOLDER || 'solutions/'

// LOGGING
if (process.env.SQLITE_PATH !== ':memory:') {
  var logwritestream = fs.createWriteStream(process.env.SQLITE_PATH || dbname + '.log', { defaultEncoding: 'utf8' })

  db.on('trace', function (trace) {
    logwritestream.write(trace + '\n\n')
  })
}

// CACHING
var cacheQueries = process.env.CACHE_QUERIES || false
var queryCache = {}

/*
  for several reasons this needs refactoring
    * it's not a good idea to add stuff to an object you don't own (the db object)
    * the error intercepting is unclean
*/

function stripComments (query) {
  var singleLinecomments = new RegExp('(--.*)$', 'gm')
  var commentBlocks = new RegExp('(((\\/\\*)+?[\\w\\W]+?(\\*\\/)+))', 'gm')
  return query.replace(singleLinecomments, '').replace(commentBlocks, '').trim()
}

db.withSQLFromFile = function (file) {
  var query
  var error

  try {
    if (cacheQueries && !queryCache[file]) {
      query = fs.readFileSync(solutionFolder + file, 'utf8')
      queryCache[file] = query
    } else if (cacheQueries) {
      query = queryCache[file]
    } else {
      query = fs.readFileSync(solutionFolder + file, 'utf8')
    }
  } catch (err) {
    error = err // like I say, refactoring necessary
  }

  // sometimes the encoding of the read files is wrong and it throughs a syntax error
  function createInterceptEncodingError (callback) {
    return function interceptEncodingError (error, results) {
      if (!error || error.code !== 'SQLITE_ERROR') return callback(error, results)

      var idxOfNear = error.message.indexOf('near')
      var idxOfSyntax = error.message.indexOf('syntax error')

      // it should be a syntax error
      if (!idxOfNear || !idxOfSyntax) return callback(error, results)

      // the near text should be 1 char (equals 10 between 'near' and 'syntax')
      if ((idxOfSyntax - idxOfNear) !== 10) return callback(error, results)

      // the suspicious character has codePoint of 65279
      if (error.message.codePointAt(idxOfNear + 6) === 65279) {
        var newError = new Error('The encoding of the file `' + solutionFolder + file + "` might be wrong. Try to change it to 'UTF-8 no BOM'. Original error messages: " + error.message)
        newError.stack = error
        error = newError
      }
      callback(error, results)
    }
  }

  return {
    run: function () {
      // it's ugly. last element of arguments is the callback
      var callback = arguments[arguments.length - 1]

      if (error) {
        return callback(error)
      }
      if (!stripComments(query)) {
        return callback(new Error("File doesn't contain any SQL statements: " + solutionFolder + file))
      }

      var args = [query].concat(Array.prototype.slice.call(arguments))

      // replace callback with intercepted callbackhandler
      args[args.length - 1] = createInterceptEncodingError(callback)

      return db.run.apply(db, args)
    },

    exec: function () {
      // it's ugly. last element of arguments is the callback
      var callback = arguments[arguments.length - 1]

      if (error) {
        return callback(error)
      }
      if (!stripComments(query)) {
        return callback(new Error("File doesn't contain any SQL statements: " + solutionFolder + file))
      }

      var args = [query].concat(Array.prototype.slice.call(arguments))

      // replace callback with intercepted callbackhandler
      args[args.length - 1] = createInterceptEncodingError(callback)

      return db.exec.apply(db, args)
    },

    get: function () {
      // it's ugly. last element of arguments is the callback
      var callback = arguments[arguments.length - 1]

      if (error) {
        return callback(error)
      }
      if (!stripComments(query)) {
        return callback(new Error("File doesn't contain any SQL statements: " + solutionFolder + file))
      }

      var args = [query].concat(Array.prototype.slice.call(arguments))

      // replace callback with intercepted callbackhandler
      args[args.length - 1] = createInterceptEncodingError(callback)

      return db.get.apply(db, args)
    },

    all: function () {
      // it's ugly. last element of arguments is the callback
      var callback = arguments[arguments.length - 1]

      if (error) {
        return callback(error)
      }
      if (!stripComments(query)) {
        return callback(new Error("File doesn't contain any SQL statements: " + solutionFolder + file))
      }

      var args = [query].concat(Array.prototype.slice.call(arguments))

      // replace callback with intercepted callbackhandler
      args[args.length - 1] = createInterceptEncodingError(callback)

      return db.all.apply(db, args)
    }
  }
}

module.exports = db
