var express = require('express')
var router = express.Router()
var db = require('../config/db.js')
var async = require('async')

var onlyAdmins = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Login <a href="/users/login">here</a>, please.')
  }
  if (req.user && !req.user.admin) {
    return res.status(403).send('Sie benötigen Adminrechte.')
  }
  next()
}

router.get('/',
  onlyAdmins,
  function (req, res, next) {
    async.series({
      two_all_employees: function (cb) {
        db.withSQLFromFile('hw1/employees_all.sql')
          .all(function () {
            // We want to display errors where the results should
            // show up, that's why errors are not handeled here
            cb(null, arguments)
          })
      },
      three_departements: function (cb) {
        db.all('SELECT Manager AS ssn, Name AS departmentShort, Beschreibung AS department FROM Abteilungen',
          function (err, results) {
            if (err) return cb(err)
            cb(null, results)
          })
      },
      employees_in_department: function (cb) {
        db.withSQLFromFile('hw1/employees_in_department.sql')
          .all({ $departmentShort: 'Kon' }, function () {
            cb(null, arguments)
          })
      },
      expensive_employee: function (cb) {
        db.withSQLFromFile('hw1/employee_max_rate.sql')
          .get(function () {
            cb(null, arguments)
          })
      },
      employees_in_project: function (cb) {
        db.withSQLFromFile('hw1/employees_in_project.sql')
          .all({ $projectName: 'RevolutionaryProduct' }, function () {
            cb(null, arguments)
          })
      }
    },
    function (err, results) {
      if (err) return next(err)
      res.render('org', {
        title: 'Organisation',
        user: req.user,
        two_error: results.two_all_employees[0] && results.two_all_employees[0].message,
        employees: results.two_all_employees[1],
        departements: results.three_departements,
        four_error: results.employees_in_department[0] && results.employees_in_department[0].message,
        employees_in_department: results.employees_in_department[1],
        eight_error: results.expensive_employee[0] && results.expensive_employee[0].message,
        expensiveEmployee: results.expensive_employee[1],
        nine_error: results.employees_in_project[0] && results.employees_in_project[0].message,
        employees_in_project: results.employees_in_project[1]
      })
    })
  }
)

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

router.post('/createEmployees', onlyAdmins,
  function (req, res, next) {
    addEmployees(function (err) {
      if (err) return next(err)
      db.withSQLFromFile('hw1/testdata.sql')
        .exec(function (err) {
          if (err) return next(err)
          req.flash('success', 'Testdaten eingefügt')
          res.redirect('/org')
        })
    })
  }
)

// Abfrage 1
router.post('/employee',
  onlyAdmins,
  function (req, res, next) {
    req.check('ssn', 'SVNR ist merkwürdig')
      .len(1, 10)
    req.sanitize('forename').trim()
    req.sanitize('surname').trim()
    req.check('surname', 'Kein Name gesetzt')
      .notEmpty()

    var errors = req.validationErrors()
    if (!errors) {
      db.withSQLFromFile('hw1/employee_add.sql')
        .run({
          $ssn: req.body.ssn,
          $forename: req.body.forename,
          $surname: req.body.surname,
          $rate: req.body.rate
        },
        function (err) {
          if (err) return next(err)
          req.flash('success', 'Mitarbeiter angelegt')
          res.redirect('/org')
        })
    } else {
      res.send(JSON.stringify(errors))
      // TODO: render with error messages
    }
  }
)

// Abfrage 3
router.post('/employee_increase_rate',
  onlyAdmins,
  function (req, res, next) {
    // TODO: sanitize input. Never trust the user input
    db.withSQLFromFile('/hw1/employee_increase_rate.sql')
      .run({
        $ssn: req.body.ssn,
        $rateIncrement: req.body.rateIncrement
      },
      function (err) {
        if (err) return next(err)
        req.flash('success', 'Stundensatz angepasst')
        res.redirect('/org')
      })
  }
)

// Abfrage 5
router.post('/employee_to_department',
  onlyAdmins,
  function (req, res, next) {
    // TODO: req.sanitize()
    db.withSQLFromFile('/hw1/employee_add_to_department.sql')
      .run({
        $ssn: req.body.ssn,
        $departmentShort: req.body.departmentShort
      },
      function (err) {
        if (err) return next(err)
        req.flash('success', 'Mitarbeiter der Abteilung hinzugefügt')
        res.redirect('/org')
      })
  }
)

// Abfrage 6
router.post('/department_set_manager',
  onlyAdmins,
  function (req, res, next) {
    // TODO: req.sanitize()
    db.withSQLFromFile('/hw1/department_set_manager.sql')
      .run({
        $ssn: req.body.ssn,
        $departmentShort: req.body.departmentShort
      },
      function (err) {
        if (err) return next(err)
        req.flash('success', 'Manager gesetzt')
        res.redirect('/org')
      })
  }
)

// Abfrage 7
router.post('/department_remove',
  onlyAdmins,
  function (req, res, next) {
    // TODO: req.sanitize()
    db.withSQLFromFile('/hw1/department_remove.sql')
      .run({
        $departmentShort: req.body.departmentShort
      },
      function (err) {
        if (err) {
          req.flash('info', 'Hinweis: Diese Fehlermeldung ist möglicherweise richtig.')
          return next(err)
        }
        req.flash('success', 'Abteilung entfernt')
        res.redirect('/org')
      })
  }
)

module.exports = router
