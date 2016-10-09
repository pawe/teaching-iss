
var db = require('../config/db.js')
var expect = require('expect.js')
var async = require('async')

describe('Hausübung 4', function () {
  // in an actual test setup, this could be done in an before hook (https://mochajs.org/#hooks)
  describe('Vorbereitung der Tests', function () {
    it('soll Organisationstabellen (für Projekte) ohne Fehler erstellen (`hw1/migration_up.sql`)', function (done) {
      db.withSQLFromFile('hw1/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
    it('soll Testdaten ohne Fehler hinzufügen (`hw1/employee_add.sql`)', function (done) {
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
    it('soll Projekte (u.a.) ohne Fehler in die Datenbank einfügen (`hw1/testdata.sql`)', function (done) {
      db.withSQLFromFile('hw1/testdata.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  describe('Erstellen der Datenbanktabellen (`hw4/migration_up.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw4/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  describe('Allgemeines Konto Hinzufügen (`hw4/account_add.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw4/account_add.sql')
        .run({$accountName: 'AK'},
        function (err) {
          expect(err).to.not.be.ok()
          done()
        })
    })
  })

  describe('Allgemeines Konto erstellen und zu Projekt hinzufügen (`hw4/project_account_add.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw4/account_add.sql')
        .run({$accountName: 'A'},
        function (err) {
          expect(err).to.not.be.ok()
          db.withSQLFromFile('hw4/project_account_add.sql')
            .run({
              $accountName: 'A',
              $project: 'Automation'
            }, function (err) {
              expect(err).to.not.be.ok()
              done()
            })
        })
    })
  })
  describe('Weitere Konten erstellen und Projekten zuweisen (`hw4/project_account_add.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw4/account_add.sql')
        .run({$accountName: 'NNP'},
        function (err) {
          expect(err).to.not.be.ok()
          db.withSQLFromFile('hw4/project_account_add.sql')
            .run({
              $accountName: 'NNP',
              $project: 'NewNewProduct'
            }, function (err) {
              expect(err).to.not.be.ok()
              done()
            })
        })
    })
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw4/account_add.sql')
        .run({$accountName: 'RP'},
        function (err) {
          expect(err).to.not.be.ok()
          db.withSQLFromFile('hw4/project_account_add.sql')
            .run({
              $accountName: 'RP',
              $project: 'RevolutionaryProduct'
            }, function (err) {
              expect(err).to.not.be.ok()
              done()
            })
        })
    })
  })
  describe('Alle Konten auflisten (`hw4/accounts.sql`)', function () {
    it('soll ohne Fehler alle (vier) Konten auflisten', function (done) {
      db.withSQLFromFile('hw4/accounts.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.have.length(4)
          expect(results).to.eql([
            { accountName: 'A' },
            { accountName: 'AK' },
            { accountName: 'NNP' },
            { accountName: 'RP' }
          ])
          done()
        })
    })
  })
  describe('Nur Projektkonten auflisten (`hw4/project_accounts.sql`)', function () {
    it('soll ohne Fehler die (drei) Projektkonten auflisten', function (done) {
      db.withSQLFromFile('hw4/project_accounts.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.have.length(3)
          done()
        })
    })
  })

  describe('Erste Testbuchung', function () {
    var record
    describe('Buchungssatz hinzufügen (`hw4/accounting_record_add.sql`)', function () {
      it('Buchungssatz hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_record_add.sql')
          .run({
            $date: '2016-10-25',
            $text: 'Testbuchugn 1'
          }, function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('letzen buchungssatznummer auslesen (INTEGER PRIMARY KEY AUTOINCREMENT)', function (done) {
        db.get('SELECT last_insert_rowid() AS record;',
          function (err, result) {
            expect(err).to.not.be.ok()
            expect(result.record).to.eql(1)
            record = result.record
            done()
          })
      })
    })
    describe('Buchugnszeile zu Buchungssatz hinzufügen (`hw4/accounting_entry_line_add.sql`)', function () {
      it('soll erste Buchungszeile ohne Fehler hinzufügen ', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'A',
            $amount: 1000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('soll zweite Buchungszeile ohne Fehler hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'NNP',
            $amount: 2000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('soll dritte Buchungszeile ohne Fehler hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'AK',
            $amount: -3000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })
    })
  })

  describe('Zweite Testbuchung', function () {
    var record
    describe('Buchungssatz hinzufügen (`hw4/accounting_record_add.sql`)', function () {
      it('Buchungssatz hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_record_add.sql')
          .run({
            $date: '2016-10-26',
            $text: 'Testbuchung 2'
          }, function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('letzen buchungssatznummer auslesen (INTEGER PRIMARY KEY AUTOINCREMENT)', function (done) {
        db.get('SELECT last_insert_rowid() AS record;',
          function (err, result) {
            expect(err).to.not.be.ok()
            expect(result.record).to.eql(2)
            record = result.record
            done()
          })
      })
    })
    describe('Buchugnszeile zu Buchungssatz hinzufügen (`hw4/accounting_entry_line_add.sql`)', function () {
      it('soll erste Buchungszeile ohne Fehler hinzufügen ', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'A',
            $amount: 50000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('soll zweite Buchungszeile ohne Fehler hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'NNP',
            $amount: 2000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('soll dritte Buchungszeile ohne Fehler hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'RP',
            $amount: 496004000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })

      it('soll vierte Buchungszeile ohne Fehler hinzufügen', function (done) {
        db.withSQLFromFile('hw4/accounting_entry_line_add.sql')
          .run({
            $record: record,
            $accountName: 'AK',
            $amount: -496011000
          },
          function (err) {
            expect(err).to.not.be.ok()
            done()
          })
      })
    })
  })

  describe('Buchungssätze auflisten (`hw4/records.sql`)', function () {
    it('soll ohne Fehlerl alle (zwei) Buchungszeilen auflisten und dem erwarteten Ergebnis entsprechen', function (done) {
      db.withSQLFromFile('hw4/records.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.have.length(2)
          expect(results).to.eql([
            { record: 1, text: 'Testbuchugn 1', date: '2016-10-25' },
            { record: 2, text: 'Testbuchung 2', date: '2016-10-26' }
          ])
          done()
        })
    })
  })
  describe('Buchungszeilen für Buchungssatz #1 auflisten (`hw4/entry_lines.sql`)', function () {
    it('soll ohne Fehler das erwartete Ergebnis liefern', function (done) {
      db.withSQLFromFile('hw4/entry_lines.sql')
        .all({ $record: 1 },
        function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.have.length(3)
          expect(results).to.eql([
            { number: 1, accountName: 'A', amount: 1000 },
            { number: 2, accountName: 'NNP', amount: 2000 },
            { number: 3, accountName: 'AK', amount: -3000 }
          ])
          done()
        })
    })
  })

  describe('Projekte mit Bugdet ausgeben (`hw4/projects_budget_overview.sql`)', function () {
    it('soll ohne Fehler das erwartete Ergebnis liefern', function (done) {
      db.withSQLFromFile('hw4/projects_budget_overview.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.have.length(3)
          expect(results).to.eql([
            { projectName: 'Automation',
              budget: 150000,
              spent: 51000,
              remaining: 99000 },
            { projectName: 'RevolutionaryProduct',
              budget: 500000000,
              spent: 496004000,
              remaining: 3996000 },
            { projectName: 'NewNewProduct',
              budget: 4000000,
              spent: 4000,
              remaining: 3996000 }
          ])
          done()
        })
    })
  })
})
