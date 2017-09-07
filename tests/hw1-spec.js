var db = require('../config/db.js')
var expect = require('expect.js')
var fs = require('fs')
var async = require('async')

describe('Vorbereitung der Tests', function () {
  // in an actual test setup, this could be done in an before
  // hook (https://mochajs.org/#hooks)
  describe('Erstellen der Datenbanktabellen (hw1/migration_up.sql)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw1/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  // this needs also to happen when the programm is executed
  // don't want to put it into the testdata.sql because it would be the
  // solution for 1.2.1
  describe('Mitarbeiter einfügen (hw1/employee_add.sql)',
    function () {
      it('Testdaten ohne Fehler hinzufügen', function (done) {
        var employeesToInsert = require('../solutions/hw1/testdata.json')
        async.each(employeesToInsert,
          function (employee, cb) {
            db.withSQLFromFile('hw1/employee_add.sql')
              .run(employee, cb)
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          }
        )
      })
    }
  )

  describe('Einfügen der restlichen Testdaten (hw1/testdata.sql)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw1/testdata.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })
})

describe('Hausübung 1', function () {
  describe('Aufgabe 1.1: Konzeptioneller Datenbankentwurf ', function () {
    it('Im Verzeichnis `solutions/hw1` soll eine PDF-Datei vorhanden sein',
      function (done) {
        fs.readdir('solutions/hw1', function (err, files) {
          expect(err).to.not.be.ok()
          var patt1 = /\.pdf$/i
          var pdfs = files.filter(
            function (filename) {
              return !!filename.match(patt1)
            })
          expect(pdfs).to.not.be.empty()
          done()
        })
      }
    )
  })


  describe('Aufgabe 1.2: Mitarbeiterverwaltung', function () {
    describe('Abfrage 1: Mitarbeiter hinzufügen (hw1/employee_add.sql)', function () {
      it('soll einen Mitarbeiter ohne Fehler hinzufügen ', function (done) {
        db.withSQLFromFile('hw1/employee_add.sql')
          .run({
            $ssn: 100,
            $surname: 'Franz',
            $forename: 'Führich',
            $rate: 40
          },
          function (err) {
            expect(err).not.to.be.ok()
            done()
          }
          )
      })

      it('soll Fehlschlagen, falls es die Personalnummer schon gibt', function (done) {
        db.withSQLFromFile('hw1/employee_add.sql')
          .run({
            $ssn: 100,
            $surname: 'Solte',
            $forename: 'Egalsen',
            $rate: 40
          },
          function (err) {
            expect(err).to.be.ok()
            done()
          }
          )
      })

      it('soll einen Mitarbeiter mit gleichem Namen aber unterschiedlicher Personalnummer ohne Fehler hinzufügen',
        function (done) {
          db.withSQLFromFile('hw1/employee_add.sql')
            .run({
              $ssn: 101,
              $surname: 'Franz',
              $forename: 'Führich',
              $rate: 45
            },
            function (err) {
              expect(err).not.to.be.ok()
              done()
            }
            )
        }
      )
    })

    describe('Abfrage 2: Mitarbeitername und Stundensatz (hw1/employees_all.sql)', function () {
      it('soll alle Mitarbeiter ohne Fehler zurückgeben', function (done) {
        db.withSQLFromFile('hw1/employees_all.sql')
          .all(function (err, result) {
            expect(err).to.not.be.ok()
            expect(result).to.have.length(24)
            expect(result[0]).to.only.have.keys('ssn', 'forename', 'surname', 'rate')
            done()
          })
      })
    })

    describe('Abfrage 3: Erhöhung des Stundensatzes (hw1/employee_increase_rate.sql)', function () {
      it('soll den Stundensatz eines Mitarbeiters um 10 erhöhen', function (done) {
        db.withSQLFromFile('hw1/employee_increase_rate.sql')
          .run({ $ssn: 9, $rateIncrement: 10 },
            function (err) {
              expect(err).not.to.be.ok()
              db.get('SELECT Stundensatz AS rate FROM Mitarbeiter WHERE SVNR = $ssn;',
                { $ssn: 9 },
                function (err, result) {
                  expect(err).to.not.be.ok()
                  expect(result.rate).to.be(47)
                  done()
                })
            }
          )
      })

      it('soll den Stundensatz andere Mitarbeiter unberührt lassen', function (done) {
        db.get('SELECT Stundensatz AS rate FROM Mitarbeiter WHERE SVNR = $ssn;',
          { $ssn: 8 },
          function (err, result) {
            expect(err).to.not.be.ok()
            expect(result.rate).to.be(55)
            done()
          })
      })
    })

    describe('Abfrage 4: Mitarbeiter zur Abteitlung (hw1/employee_add_to_department.sql)', function () {
      it('soll ohne Fehler für Mitarbeiter ohne Abteilung funktioneren',
        function (done) {
          db.withSQLFromFile('hw1/employee_add_to_department.sql')
            .run({ $ssn: 20, $departmentShort: 'Kon' },
              function (err) {
                expect(err).to.not.be.ok()
                done()
              }
            )
        }
      )

      it('soll Fehlschlagen, falls Mitarbeiter nicht exisitiert', function (done) {
        db.withSQLFromFile('hw1/employee_add_to_department.sql')
          .run({ $ssn: 999, $departmentShort: 'Kon' },
            function (err) {
              expect(err).to.be.ok()
              expect(err.code).to.eql('SQLITE_CONSTRAINT')
              done()
            }
          )
      })

      it('soll Fehlschlagen, falls die Abteilung nicht existiert', function (done) {
        db.withSQLFromFile('hw1/employee_add_to_department.sql')
          .run({ $ssn: 21, $departmentShort: 'GibtsNicht' },
            function (err) {
              expect(err).to.be.ok()
              expect(err.code).to.eql('SQLITE_CONSTRAINT')
              done()
            }
          )
      })

      it('soll Fehlschlagen, falls der Mitarbeiter bereits einer anderen Abteilung zugehörig ist',
        function (done) {
          db.withSQLFromFile('hw1/employee_add_to_department.sql')
            .run({ $ssn: 9, $departmentShort: 'Kon' }, // Employee #9 is in Pro
              function (err) {
                expect(err).to.be.ok()
                expect(err.code).to.be('SQLITE_CONSTRAINT')
                done()
              }
            )
        }
      )
    })


    describe('Abfrage 5: Mitarbeiter in Abteilung (hw1/employees_in_department.sql)', function () {
      it('soll alle Mitarbeiter in einer Abeilung ohne Fehler auflisten',
        function (done) {
          db.withSQLFromFile('hw1/employees_in_department.sql')
            .all({ $departmentShort: 'Kon' },
              function (err, result) {
                expect(err).to.not.be.ok()
                expect(result).to.have.length(4)
                expect(result[0]).to.only.have.keys('ssn')
                done()
              }
            )
        }
      )
    })

    describe('Abfrage 6: Manager einer Abteilung ändern (hw1/department_set_manager.sql)', function () {
      it('soll den Leiter einer Abteilung setzen', function (done) {
        db.withSQLFromFile('hw1/department_set_manager.sql')
          .run({ $departmentShort: 'Kon', $ssn: 13 },
            function (err) {
              expect(err).to.not.be.ok()
              done()
            }
          )
      })
      it('soll andere Abteilungen unberührt lassen', function (done) {
        // only testing one other department, not all of them
        db.get("SELECT Manager FROM Abteilungen WHERE Name='Pro'",
          function (err, result) {
            expect(err).to.not.be.ok()
            expect(result.Manager).to.eql(2)
            done()
          }
        )
      })
      it('soll Fehlschlagen, wenn Mitarbeiter nicht existiert', function (done) {
        db.withSQLFromFile('hw1/department_set_manager.sql')
          .run({ $departmentShort: 'Kon', $ssn: 999 },
            function (err) {
              expect(err).to.be.ok()
              expect(err.code).to.be('SQLITE_CONSTRAINT')
              done()
            }
          )
      })
    })


    describe('Abfrage 7: Auflösen einer Abteilung ohne Mitarbeiter (hw1/department_remove.sql)',
      function () {
        it('soll Abteilung ohne Fehler entfernen', function (done) {
          db.withSQLFromFile('hw1/department_remove.sql')
            .run({ $departmentShort: 'Ent' }, // Entwicklugn hat keine Mitarbeiter.
              function (err) {
                expect(err).to.not.be.ok()
                done()
              }
            )
        })

        it('soll Fehlschlagen, wenn der Abteilung noch Mitarbeiter zugehörig sind', function (done) {
          db.withSQLFromFile('hw1/department_remove.sql')
            .run({ $departmentShort: 'Kon' },
              function (err) {
                expect(err).to.be.ok()
                expect(err.code).to.be('SQLITE_CONSTRAINT')
                done()
              }
            )
        })

        it('soll andere Abteilungen unberührt lassen', function (done) {
          db.get('SELECT COUNT() AS countDepartments FROM Abteilungen',
            function (err, result) {
              expect(err).to.not.be.ok()
              expect(result.countDepartments).to.be(5)
              done()
            }
          )
        })
      }
    )

    describe('Abfrage 8: Mitarbeiter mit höchstem Stundensatz (hw1/employee_max_rate.sql)', function () {
      it('soll den Mitarbeiter mit dem höchsten Stundensatz zurückgeben',
        function (done) {
          db.withSQLFromFile('hw1/employee_max_rate.sql')
            .get(function (err, result) {
              expect(err).to.not.be.ok()
              expect(result).to.eql({ ssn: 8, rate: 55 })
              done()
            })
        }
      )
    })

    describe('Abfrage 9: Mitarbeiter in Projekt (hw1/employees_in_project.sql)', function () {
      it('soll Mitarbeiter nicht mehrfach auflisten', function (done) {
        db.withSQLFromFile('hw1/employees_in_project.sql')
          .all({ $projectName: 'RevolutionaryProduct' },
            function (err, result) {
              expect(err).to.not.be.ok()
              expect(result).to.have.length(4)
              expect(result[0]).to.only.have.keys('ssn')
              done()
            }
          )
      })
    })

    describe('Abfrage 10: Mitarbeiter in Projekt (hw1/students_department.sql)', function () {
      it('soll mitarbeiter', function (done) {
        db.withSQLFromFile('hw1/students_department.sql')
          .exec(function (err) {
            expect(err).not.to.be.ok()

            var matrikelnummer = require('../.student.json').matrikelnummer

            db.get('SELECT COUNT() as employee_count FROM arbeitet_in WHERE Abteilung = ?', matrikelnummer,
              function (err, res) {
                expect(err).not.to.be.ok()
                // quersumme der letzten zwei Ziffern der Matrikelnummer
                var expectedEmployeeCount = matrikelnummer
                  .slice(-2)
                  .split('')
                  .reduce(function (accumulator, currentValue) {
                    return accumulator + parseInt(currentValue, 10)
                  }, 0)

                expect(res).to.eq(expectedEmployeeCount)
                done()
              })
          })
      })
    })
  })
})
