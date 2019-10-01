var db = require('../config/db.js')
var expect = require('expect.js')
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
            db.run('INSERT INTO Mitarbeiter VALUES ($ssn, $forename, $surename, $rate)',
              employee, cb)
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

describe('Lecture 3', function () {
  it('should create the view without error', function (done) {
    db.withSQLFromFile('lecture3/migration_up.sql')
      .run(function (err) {
        expect(err).to.not.be.ok()
        done()
      })
  })
  it('selects everything from the view', function (done) {
    db.all('SELECT * FROM Unternehmenshierarchie', function (err, results) {
      expect(err).to.not.be.ok()
      expect(results).to.have.length(22)
      done()
    })
  })
  it('recursive query', function (done) {
    db.withSQLFromFile('lecture3/under_Kamilla.sql')
      .all(function (err, results) {
        expect(err).to.not.be.ok()
        expect(results).to.eql([
          { line: 'Kamilla' },
          { line: '..Rolph' },
          { line: '....Heimo' },
          { line: '......Holger' },
          { line: '......Isabella' },
          { line: '......Mario' },
          { line: '....Arnold' },
          { line: '......Liebhart' },
          { line: '......Christina' },
          { line: '......Bertrand' },
          { line: '......Denise' },
          { line: '......Georg' },
          { line: '....Stefan' },
          { line: '..Gondolin' },
          { line: '....Heinrich' },
          { line: '....Adalbert' },
          { line: '....Siegfried' }
        ])
        done()
      })
  })
})
