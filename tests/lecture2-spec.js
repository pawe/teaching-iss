var db = require('../config/db.js')
var expect = require('expect.js')
var fs = require('fs')
var async = require('async')
var csv = require('fast-csv')


function insertData (testdata, sql, callback) {
  // just a _quick and dirty_ replace.
  // it's one of the things you would never do in a production system
  // because it opens up the system for sql injections
  // right way would be to execute each insert with driver and use transaction
  // this would make the assignment more complicated to achieve
  async.each(testdata, function (testdata, cb) {
    var transaction = sql
    Object.keys(testdata).forEach(function (key) {
      transaction = transaction.split(key).join("'" + testdata[key] + "'")
    })

    db.exec(transaction, function (err) {
      if (err) return cb(err)
      cb()
    })
  },
  callback
  )
}

describe('Lecture 2: Normalisierung', function () {
  describe('Mitarbeiter und ihre Sprachfähigketien', function () {
    it('should setup Mitarbeiter (org) tables', function (done) {
      db.withSQLFromFile('hw1/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
    it('should run without an error', function (done) {
      db.withSQLFromFile('lecture2/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  describe('Mitarbeiter einfügen', function () {
    it('should run without any errors', function (done) {
      var testDataLang = []
      csv.fromPath('solutions/lecture2/testdata_lang.csv', { headers: true })
        .on('data', function (data) {
          testDataLang.push(data)
        })
        .on('end', function () {
          var sqlTemplate = fs.readFileSync('solutions/lecture2/data_intake.sql', 'utf8')
          insertData(testDataLang, sqlTemplate, function (err) {
            expect(err).to.not.be.ok()
            done()
          })
        })
    })
  })

  describe('Abfragen', function () {
    it('should list all languages', function (done) {
      db.all(`SELECT Mitarbeiter, Sprache, Grad 
              FROM SprachFähigkeiten 
              ORDER BY Mitarbeiter, Sprache, Grad`, // we need a definitive order, if we want to compare it a fixed result...
        function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.eql(
            [
              { Mitarbeiter: 19, Sprache: 'englisch', Grad: 2 },
              { Mitarbeiter: 19, Sprache: 'russisch', Grad: 3 },
              { Mitarbeiter: 20, Sprache: 'französisch', Grad: 1 },
              { Mitarbeiter: 21, Sprache: 'französisch', Grad: 3 },
              { Mitarbeiter: 21, Sprache: 'portugisisch', Grad: 2 },
              { Mitarbeiter: 21, Sprache: 'spanisch', Grad: 3 },
              { Mitarbeiter: 22, Sprache: 'polnisch', Grad: 3 }
            ]
          )
          done()
        }
      )
    })

    it('should return', function (done) {
      // TODO: put in .sql file
      db.all(`SELECT m.Vorname, m.Nachname, COUNT(Sprache) AS anzahlSprachen
              FROM Mitarbeiter m 
              JOIN SprachFähigkeiten sf ON sf.Mitarbeiter = m.SVNR 
              GROUP BY m.SVNR
              ORDER BY Nachname, Vorname, anzahlSprachen`, // same as above
        function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.eql(
            [
              { Vorname: 'Anita', Nachname: 'Almer', anzahlSprachen: 1 },
              { Vorname: 'Hugo', Nachname: 'Hundt', anzahlSprachen: 1 },
              { Vorname: 'Monika', Nachname: 'Müller', anzahlSprachen: 2 },
              { Vorname: 'Siegfried', Nachname: 'Stinger', anzahlSprachen: 3 }
            ]
          )
          done()
        })
    })
  })
})
