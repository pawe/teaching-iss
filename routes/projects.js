var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var async = require('async')
var path = require('path')
var AJV = require('ajv')

router.get('/', function (req, res, next) {
  async.series({
    projects: function (cb) {
      db.all('SELECT Name AS name FROM Projekte;',
        function (err, results) {
          if (err) return cb(err)
          cb(null, results)
        })
    },
    accounts: function (cb) {
      db.withSQLFromFile('hw4/accounts.sql')
        .all(function () {
          cb(null, arguments)
        })
    },
    project_accounts: function (cb) {
      db.withSQLFromFile('hw4/project_accounts.sql')
        .all(function () { cb(null, arguments) })
    },
    records: function (cb) {
      db.withSQLFromFile('hw4/records.sql')
        .all(function () { cb(null, arguments) })
    },
    entry_lines: function (cb) {
      db.withSQLFromFile('hw4/entry_lines.sql')
        .all({
          $record: req.query.selected_record
        },
        function () { cb(null, arguments) })
    },
    projects_budget: function (cb) {
      db.withSQLFromFile('hw4/projects_budget_overview.sql')
        .all(function () { cb(null, arguments) })
    }
  },
  function (err, results) {
    if (err) return next(err)

    res.render('projects', {
      title: 'Projektkosten buchen',
      user: req.user,
      projects: results.projects,
      accounts_error: results.accounts[0] && results.accounts[0].message,
      accounts: results.accounts[1],
      project_accounts_error: results.project_accounts[0] && results.project_accounts[0].message,
      project_accounts: results.project_accounts[1],
      records_error: results.records[0] && results.records[0].message,
      records: results.records[1],
      entry_lines_error: results.entry_lines[0] && results.entry_lines[0].message,
      entry_lines: results.entry_lines[1],
      projects_budget_error: results.projects_budget[0] && results.projects_budget[0].message,
      projects_budget: results.projects_budget[1]
    })
  })
})

function addEmployees (callback) {
  var employeesToInsert = require('../assignments/hw1/testdata.json')
  async.each(employeesToInsert,
    function (employee, cb) {
      db.withSQLFromFile('hw1/employee_add.sql')
        .run(employee, cb)
    },
    function (err) {
      callback(err)
    }
  )
}

router.post('/createProjects',
  function (req, res, next) {
    addEmployees(function (err) {
      if (err) return next(err)
      db.withSQLFromFile('../assignments/hw1/testdata.sql')
        .exec(function (err) {
          if (err) return next(err)
          res.redirect('/projects')
        })
    })
  }
)

router.post('/project_account', function (req, res, next) {
  async.series({
    startTransaction: function (cb) {
      db.run('BEGIN;', cb)
    },
    createAccount: function (cb) {
      db.withSQLFromFile('hw4/account_add.sql')
        .run({
          $accountName: req.body.account
        },
        function () { cb(null, arguments) })
    },
    addProjectToAccount: function (cb) {
      db.withSQLFromFile('hw4/project_account_add.sql')
        .run({
          $accountName: req.body.account,
          $project: req.body.project
        },
        function () { cb(null, arguments) })
    },
    commitTransaction: function (cb) {
      db.run('COMMIT;', cb)
    }
  },
  function (err, results) {
    if (err) {
      db.run('ROLLBACK;', function (dbErr) {
        if (dbErr) return next(dbErr)
        return next(err)
      })
    }
    if (results.createAccount[0]) {
      db.run('ROLLBACK;', function (dbErr) {
        if (dbErr) return next(dbErr)
        return next(results.createAccount[0])
      })
    }
    if (results.addProjectToAccount[0]) {
      db.run('ROLLBACK;', function (dbErr) {
        if (dbErr) return next(dbErr)
        return next(results.addProjectToAccount[0])
      })
    }
    res.redirect('/projects')
  })
})

router.post('/account', function (req, res, next) {
  db.withSQLFromFile('hw4/account_add.sql')
    .run({ $accountName: req.body.account },
      function (err) {
        if (err) return next(err)
        res.redirect('/projects')
      })
})

router.post('/add_project_record', function (req, res, next) {
  async.waterfall([
    function startTransaction (cb) {
      db.run('BEGIN;', cb)
    },
    function createRecord (cb) {
      db.withSQLFromFile('hw4/accounting_record_add.sql')
        .run({
          $date: req.body.date,
          $text: req.body.text
        },
        cb)
    },
    function getLastInsertId (cb) {
      db.get('SELECT last_insert_rowid() AS record', function (err, result) {
        if (err) return cb(err)
        cb(null, result.record)
      })
    },
    function buildEntryLines (record, cb) {
      var projectEntrise = ['p1', 'p2', 'p3']
        .filter(function (p) {
          return (req.body[p] !== 'kein Konto')
        })

      var objectsToInsert = projectEntrise.map(function (p) {
        return {
          $record: record,
          $accountName: req.body[p],
          $amount: parseFloat(req.body[p + '_costs'])
        }
      })

      // for actual accounting software you'd might use special
      // libaries for financial calculations
      var totalcosts = objectsToInsert.reduce(function (left, right) {
        return { $amount: left.$amount + right.$amount }
      }, { $amount: 0 })

      objectsToInsert.push({
        $record: record,
        $accountName: req.body.account,
        $amount: -1 * totalcosts.$amount
      })

      cb(null, objectsToInsert)
    },
    function (insertMeAsEntries, cb) {
      async.each(insertMeAsEntries,
        function (entry, callback) {
          db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
            .run(entry, callback)
        },
        function (err) {
          if (err) return cb(err)
          cb()
        })
    },
    function commitTransaction (cb) {
      db.run('COMMIT;', cb)
    }
  ],
  function (err) {
    if (err) {
      return db.run('ROLLBACK;', function (dbErr) {
        if (dbErr) return next(dbErr)
        next(err)
      })
    }
    res.redirect('/projects')
  })
})

router.post('/migrationdown', function (req, res, next) {
  db.withSQLFromFile('hw4/migration_down.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/projects')
    })
})

router.post('/migrationup', function (req, res, next) {
  db.withSQLFromFile('hw4/migration_up.sql')
    .exec(function (err) {
      if (err) return next(err)
      res.redirect('/projects')
    })
})

router.get('/schema', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'solutions/hw4/schema.json'))
})

router.get('/report', function (_, res, next) {
  db.all('SELECT id, project FROM reports', function (err, results) {
    if (err) return next(err)
    res.json(results || [])
  })
})

router.get('/report/:id', function (req, res, next) {
  db.get('SELECT id, project, report, schema FROM reports WHERE id=?;', req.params.id,
    function (err, result) {
      if (err) return next(err)
      result.schema = JSON.parse(result.schema)
      result.report = JSON.parse(result.report)
      res.json(result || {})
    }
  )
})

router.post('/report', function (req, res, next) {
  console.log('request.body:', req.body)

  if (!req.body.data) {
    return res.status(400).send('Missing form data')
  }
  if (!req.body.schema) {
    // TODO: read schema from file schema.json in solutions folder
    return res.status(400).send('Missing schema')
  }

  var metaSchema = require('../assignments/hw4/meta-schema.json')

  var parsedUserSchema = req.body.schema

  var ajv = new AJV()
  var validSchema = ajv.validate(metaSchema, parsedUserSchema)

  if (!validSchema) return res.status(400).send('Not a valid Schema')

  var validData = ajv.validate(parsedUserSchema, req.body.data)

  if (!validData) return res.status(400).send('Data not valid')

  var $projectName = req.body.data.projectName || 'Kein Projektname'

  var $report = JSON.stringify(req.body.data)
  var $schema = JSON.stringify(req.body.schema)

  db.run('INSERT INTO reports (project, report, schema) VALUES($projectName, $report, $schema);', {
    $projectName,
    $report,
    $schema
  },
  function (err, id) {
    if (err) return next(err)
    res.send('ok, danke')
  }
  )
})

module.exports = router
