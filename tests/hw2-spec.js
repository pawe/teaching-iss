var db = require('../config/db.js')
var expect = require('expect.js')
var async = require('async')
var fs = require('fs')
var path = require('path')
var csv = require('fast-csv')

var solutionFolder = process.env.SOLUTIONS_FOLDER || 'solutions/'

// if this is needed in a third place, deduplicate it
function insertData (testdata, sql, callback) {
  // just a _quick and dirty_ replace.
  // it's one of the things you should never do in a production system
  // because it opens up the system for sql injections
  // right way would be to execute each insert with driver and use transaction
  // this would make the assignment more complicated to achieve
  async.each(testdata, function (testdata, cb) {
    var transaction = sql
    Object.keys(testdata).forEach(function (key) {
      transaction = transaction.split(key).join(testdata[key] ? "'" + testdata[key] + "'" : 'null')
    })

    db.exec(transaction, function (err) {
      if (err) return cb(err)
      cb()
    })
  },
  callback
  )
}

describe('Hausübung 2', function () {
  describe('Dokumentation', function () {
    it('Im Verzeichnis `solutions/hw2` soll genau eine PDF-Datei vorhanden sein',
      function (done) {
        fs.readdir(solutionFolder + 'hw2', function (err, files) {
          expect(err).to.not.be.ok()
          var patt1 = /\.pdf$/i
          var pdfs = files.filter(
            function (filename) {
              return !!filename.match(patt1)
            })
          expect(pdfs).to.have.length(1)
          done()
        })
      }
    )
  })

  describe('Fertigungsrückmeldungen', function () {
    it('Organisationstabellen ohne Fehler erstellen (`hw1/migration_up.sql`)', function (done) {
      var sql = fs.readFileSync(path.join(__dirname, '..', 'assignments/hw1/migration_up.sql'), 'utf8')
      db.exec(sql, function (err) {
        expect(err).not.to.be.ok()
        done()
      })
    })
    it('Datenbankmigration soll ohne Fehler durchlaufen (`hw2/migration_up.sql`)', function (done) {
      db.withSQLFromFile('hw2/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
    it('Einfügen der Datensätze soll ohne Fehler durchlaufen (`hw2/data_intake.sql`)', function (done) {
      var testdataProduction = []
      csv.fromPath(path.join(__dirname, '..', 'assignments/hw2/testdata.csv'), { headers: true })
        .on('data', function (data) {
          testdataProduction.push(data)
        })
        .on('end', function () {
          var sqlTemplate = fs.readFileSync(solutionFolder + 'hw2/data_intake.sql', 'utf8')
          insertData(testdataProduction, sqlTemplate, function (err) {
            expect(err).to.not.be.ok()
            done()
          })
        })
    })
  })

  describe('Abfragen', function () {
    describe('Maschinen mit Betreuernamen ausgeben (`hw2/machines_list_person_in_charge.sql`)', function () {
      it('soll ohne Fehler durchlaufen, 6 Zeilen zurückgeben und das richtige Rückgabeformat aufweisen', function (done) {
        db.withSQLFromFile('hw2/machines_list_person_in_charge.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(6)
            expect(results[0]).to.only.have.keys('machineNumber', 'machineDescription', 'forename', 'surname')
            done()
          })
      })
    })

    describe('Alle Maschinen zurückgeben (`hw2/machines_all.sql`)', function () {
      it('soll ohne Fehler durchlaufen und erwartetes Ergebnis zurückliefern', function (done) {
        db.withSQLFromFile('hw2/machines_all.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(6)
            expect(results).to.eql([
              { machineNumber: 'B0012', machineDescription: 'Blechbearbeitungszentrum TR 220' },
              { machineNumber: 'H0011', machineDescription: 'Mobiler HandlingRoboter ADD 22-1' },
              { machineNumber: 'H0012', machineDescription: 'Mobiler HandlingRoboter ADD 22-2' },
              { machineNumber: 'H0021', machineDescription: 'Mobiler HandlingRoboter ADD 22-3' },
              { machineNumber: 'M0200', machineDescription: 'Bearbeitungszentrum 1' },
              { machineNumber: 'M0201', machineDescription: 'Bearbeitungszentrum 2' }
            ])
            done()
          })
      })
    })

    describe('Werkzeuge die auf einer Maschine verwendet wurden (`hw2/machines_tools_used.sql`)', function () {
      it('soll ohne Fehler durchlaufen und erwartetes Ergebnis zurückliefern', function (done) {
        db.withSQLFromFile('hw2/machines_tools_used.sql')
          .all({
            $machineNumber: 'M0200'
          },
          function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(5)
            done()
          })
      })
    })

    describe('Einsatzorte einer Maschine (`hw2/machines_sites.sql`)', function () {
      it('soll ohne Fehler durchlaufen und erwartetes Ergebnis für Maschine "H0011" liefern', function (done) {
        db.withSQLFromFile('hw2/machines_sites.sql')
          .all({
            $machineNumber: 'H0011'
          }, function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(3)
            expect(results).to.eql([
              { longitude: 16.366918, latitude: 48.199214 },
              { longitude: 16.368173, latitude: 48.199028 },
              { longitude: 16.362252, latitude: 48.200269 }
            ])
            done()
          })
      })
    })

    describe('Maschinenbewegungen (`hw2/machine_movements.sql`)', function () {
      it('soll ohne Fehler durchlaufen und 6 Ergebniszeilen liefern die nach der Anzahl an Bewegungen sortiert sind', function (done) {
        db.withSQLFromFile('hw2/machine_movements.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(6)
            // the order of the last three rows is undefined,
            // so we only check the first three
            expect(results.slice(0, 3)).to.eql([
              { machineNumber: 'H0012', movements: 4 },
              { machineNumber: 'H0011', movements: 3 },
              { machineNumber: 'H0021', movements: 2 }
            ])
            done()
          })
      })
    })

    describe('Werkzeug Gesamteinsatzzeit (`hw2/tools_operating_time.sql`)', function () {
      it('soll ohne Fehler durchlaufen und das erwartete Ergebnis liefern', function (done) {
        db.withSQLFromFile('hw2/tools_operating_time.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.eql([
              { toolNumber: 'M-4484', operatingTime: 1139 },
              { toolNumber: 'M-4432', operatingTime: 744 },
              { toolNumber: 'M-3313', operatingTime: 351 },
              { toolNumber: 'M-3314', operatingTime: 165 },
              { toolNumber: 'S-1252', operatingTime: 141 },
              { toolNumber: 'S-1251', operatingTime: 93 },
              { toolNumber: 'S-1202', operatingTime: 86 },
              { toolNumber: 'S-1201', operatingTime: 54 },
              { toolNumber: 'M-4442', operatingTime: 53 },
              { toolNumber: 'S-1250', operatingTime: 12 }
            ])
            done()
          })
      })
    })

    describe('Restlebendauer der Werkzeuge (`hw2/tools_remaining_life.sql`)', function () {
      it('soll ohne Fehler durchlaufen, 3 Ergebniszeilen liefern, die mit dem erwarteten Ergebnis übereinstimmen', function (done) {
        db.withSQLFromFile('hw2/tools_remaining_life.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(3)
            expect(results).to.eql([
              { toolNumber: 'M-4442', remainingLife: 9947 },
              { toolNumber: 'M-4432', remainingLife: 14256 },
              { toolNumber: 'M-4484', remainingLife: 78861 }
            ])
            done()
          })
      })
    })
  })
})
