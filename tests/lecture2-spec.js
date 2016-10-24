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

  describe('Testdaten einfügen', function () {
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

    it('should return all employees with language skills sorted by grad ASC, svnr and sprache', function (done) {
      db.withSQLFromFile('lecture2/sorted_language_skills.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.eql([
            { SVNR: 20,
              Vorname: 'Hugo',
              Nachname: 'Hundt',
              Sprache: 'französisch',
              Grad: 1 },
            { SVNR: 19,
              Vorname: 'Monika',
              Nachname: 'Müller',
              Sprache: 'englisch',
              Grad: 2 },
            { SVNR: 21,
              Vorname: 'Siegfried',
              Nachname: 'Stinger',
              Sprache: 'portugisisch',
              Grad: 2 },
            { SVNR: 19,
              Vorname: 'Monika',
              Nachname: 'Müller',
              Sprache: 'russisch',
              Grad: 3 },
            { SVNR: 21,
              Vorname: 'Siegfried',
              Nachname: 'Stinger',
              Sprache: 'französisch',
              Grad: 3 },
            { SVNR: 21,
              Vorname: 'Siegfried',
              Nachname: 'Stinger',
              Sprache: 'spanisch',
              Grad: 3 },
            { SVNR: 22,
              Vorname: 'Anita',
              Nachname: 'Almer',
              Sprache: 'polnisch',
              Grad: 3 }
          ])
          done()
        })
    })

    it('should return all language skills in a department', function (done) {
      db.withSQLFromFile('lecture2/language_skills_in_department.sql')
        .all({ $deptShort: 'Kon' }, function (err, results) {
          expect(err).to.not.be.ok()
          // employees not added to departments
          expect(results).to.be.empty()
          done()
        })
    })

    it('should return all languages and the average over all employyes', function (done) {
      db.withSQLFromFile('lecture2/grouped_language_skills.sql')
        .all(function (err, results) {
          expect(err).to.not.be.ok()
          expect(results).to.eql([
            { Sprache: 'englisch', 'AVG(Grad)': 2 },
            { Sprache: 'französisch', 'AVG(Grad)': 2 },
            { Sprache: 'portugisisch', 'AVG(Grad)': 2 },
            { Sprache: 'polnisch', 'AVG(Grad)': 3 },
            { Sprache: 'russisch', 'AVG(Grad)': 3 },
            { Sprache: 'spanisch', 'AVG(Grad)': 3 }
          ])
          done()
        })
    })

    it('should return count of languages per employee, sorted by surename, forename, count of langs', function (done) {
      // TODO: put in .sql file
      db.withSQLFromFile('lecture2/languages_count_per_employee.sql')
        .all(function (err, results) {
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
