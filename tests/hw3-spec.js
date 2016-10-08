
var db = require('../config/db.js')
var expect = require('expect.js')

describe('Hausübung 3', function () {
  // in an actual test setup, this could be done in an before hook (https://mochajs.org/#hooks)
  describe('Erstellen der Datenbanktabellen (`hw3/migration_up.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      db.withSQLFromFile('hw3/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })
  describe('Ansichten erstellen', function () {
    it('soll Ansicht Produktstruktur ohne Fehler erstellen (`hw3/migration_up_product_structure.sql`)', function (done) {
      db.withSQLFromFile('hw3/migration_up_product_structure.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })

    it('soll Ansicht DurchschnittlicheBearbeitungsdauer ohne Fehler erstellen (`hw3/migration_up_average_production_time.sql`)', function (done) {
      db.withSQLFromFile('hw3/migration_up_average_production_time.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  describe('Abfragen', function () {
    describe('Strukturstückliste (`hw3/multilevel_bom.sql`)', function () {
      it('soll ohne Fehler für Baugruppe 1 durchlaufen', function (done) {
        db.withSQLFromFile('hw3/multilevel_bom.sql')
          .all({
            $assembly: '1'
          }, function (err, results) {
            expect(err).to.not.be.ok()
            console.log(results)
            done()
          })
      })
    })
    describe('Verwendungsnachweis (`hw3/part_in_assembly.sql`)', function () {
      it('soll für Teil # 10 ohne Fehler durchlaufen', function (done) {
        db.withSQLFromFile('hw3/part_in_assembly.sql')
          .all({
            $part: 10
          }, function (err, results) {
            expect(err).to.not.be.ok()
            console.log(results)
            done()
          })
      })
    })
    describe('Gesamtmenge eines Bauteil in einer Baugruppe', function () {
      it('soll ohne Fehler für Baugruppe # 1 und Teil # 10 durchlaufen', function (done) {
        db.withSQLFromFile('hw3/partcount_in_assembly.sql')
          .all({
            $assembly: 1,
            $part: 10
          },
          function (err, results) {
            expect(err).to.not.be.ok()
            console.log(results)
            done()
          })
      })
    })
    describe('Mengenstückliste (`hw3/quantitative_bom.sql`)', function () {
      it('soll ohne Fehler durchlaufen und erwartetes Ergebnis liefern', function (done) {
        db.withSQLFromFile('hw3/quantitative_bom.sql')
          .all({
            $assembly: 1
          },
          function (err, results) {
            expect(err).to.not.be.ok()
            console.log(results)
            done()
          })
      })
    })
    describe('Elemente mit Daten aus der Fertigung (`hw3/parts_with_production_data.sql`)', function () {
      it('soll ohne Fehler 10 Zeilen zurückliefern', function (done) {
        db.withSQLFromFile('hw3/parts_with_production_data.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(10)
            done()
          })
      })
    })
    describe('Elemente ohne Daten aus der Fertigung (`hw3/parts_without_production_data.sql`)', function () {
      it('soll ohne Fehler eine Zeile zurückliefern', function (done) {
        db.withSQLFromFile('hw3/parts_without_production_data.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(1)
            done()
          })
      })
    })
    describe('Durchschnittliche Bearbeitungszeiten (`hw3/parts_average_production_time.sql`)', function () {
      it('soll ohne Fehler das erwartete Ergebnis liefern', function (done) {
        db.withSQLFromFile('hw3/parts_average_production_time.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(7)
            expect(results).to.eql([
              { partNumber: 14, avgProductionTime: 846.2857142857143 },
              { partNumber: 11, avgProductionTime: 499.57142857142856 },
              { partNumber: 13, avgProductionTime: 341.57142857142856 },
              { partNumber: 10, avgProductionTime: 136.71428571428572 },
              { partNumber: 15, avgProductionTime: 33.142857142857146 },
              { partNumber: 12, avgProductionTime: 23.285714285714285 },
              { partNumber: 16, avgProductionTime: 9 }
            ])
            done()
          })
      })
    })
  })
})
