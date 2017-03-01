var sqlite3 = require('sqlite3').verbose()
var fs = require('fs')

// every time this application is started it stores its database in database_backups
var dbname = 'database_backups/iis.' + Date.now() + '.db'

// set database
var db = new sqlite3.Database(process.env.SQLITE_PATH || dbname)

var logwritestream = fs.createWriteStream(process.env.SQLITE_PATH || dbname + '.log')

db.on('trace', function (trace) {
  logwritestream.write(trace + '\n')
})

db.run('PRAGMA foreign_keys = ON;')

var solutionFolder = 'solutions/'


/*
  for several reasons this needs refactoring
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
    query = fs.readFileSync(solutionFolder + file, 'utf8')
  } catch (err) {
    error = err // like I say, refactoring necessary
  }

  return {
    run: function () {
      // it's ugly. last element of arguments should be the callback
      if (error) {
        return arguments[arguments.length - 1](error)
      }
      if (!stripComments(query)) {
        return arguments[arguments.length - 1](new Error('No SQL Code found in: ' + solutionFolder + file))
      }
      return db.run.apply(db, [query].concat(Array.prototype.slice.call(arguments)))
    },
    exec: function (callback) {
      if (error) {
        return arguments[arguments.length - 1](error)
      }
      if (!stripComments(query)) {
        return arguments[arguments.length - 1](new Error('No SQL Code found in: ' + solutionFolder + file))
      }
      return db.exec.apply(db, [query].concat(Array.prototype.slice.call(arguments)))
    },
    get: function (callback) {
      if (error) {
        return arguments[arguments.length - 1](error)
      }
      if (!stripComments(query)) {
        return arguments[arguments.length - 1](new Error('No SQL Code found in: ' + solutionFolder + file))
      }
      return db.get.apply(db, [query].concat(Array.prototype.slice.call(arguments)))
    },
    all: function (callback) {
      if (error) {
        return arguments[arguments.length - 1](error)
      }
      if (!stripComments(query)) {
        return arguments[arguments.length - 1](new Error('No SQL Code found in: ' + solutionFolder + file))
      }
      return db.all.apply(db, [query].concat(Array.prototype.slice.call(arguments)))
    }
  }
}

module.exports = db
