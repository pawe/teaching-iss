var db = require('../config/db.js')
var expect = require('expect.js')
var fs = require('fs')
var path = require('path')

describe('Hausübung 3', function () {
  // in an actual test setup, this could be done in an before hook (https://mochajs.org/#hooks)
  describe('Erstellen der Datenbanktabellen (`hw3/migration_up.sql`)', function () {
    it('soll ohne Fehler durchlaufen', function (done) {
      var sql = fs.readFileSync(path.join(__dirname, '..', 'assignments/hw3/migration_up.sql'))
      db.exec(sql, function (err) {
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
      it('soll ohne Fehler für Baugruppe "3D Drucker" durchlaufen', function (done) {
        db.withSQLFromFile('hw3/multilevel_bom.sql')
          .all({
            $assembly: '3D Drucker'
          }, function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(20)
            expect(results[0]).to.only.have.keys('level', 'element', 'quantity')
            done()
          })
      })
    })

    describe('Verwendungsnachweis (`hw3/part_in_assembly.sql`)', function () {
      it('soll für "Teil_0079/A" ohne Fehler durchlaufen', function (done) {
        db.withSQLFromFile('hw3/part_in_assembly.sql')
          .all({
            $part: 'Teil_0079/A'
          }, function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(4)
            // only first element is checked
            expect(results[0]).to.only.have.keys('assembly', 'quantity')
            var assemblies = results.map(function (row) { return row.assembly })
            expect(assemblies).to.contain('B0028/A')
            expect(assemblies).to.contain('B0033/A')
            expect(assemblies).to.contain('B0037/A')
            expect(assemblies).to.contain('B0064/A')
            done()
          })
      })
    })

    describe('Gesamtmenge eines Bauteil in einer Baugruppe (`hw3/partcount_in_assembly.sql`)', function () {
      it('soll ohne Fehler für Baugruppe "3D Drucker" und Teil "Teil_0079/A" durchlaufen', function (done) {
        db.withSQLFromFile('hw3/partcount_in_assembly.sql')
          .get({
            $assembly: '3D Drucker',
            $part: 'Teil_0079/A'
          },
          function (err, results) {
            expect(err).to.not.be.ok()
            expect(results.quantity).to.be(100)
            done()
          })
      })
    })

    describe('Mengenstückliste (`hw3/quantitative_bom.sql`)', function () {
      it('soll ohne Fehler durchlaufen und erwartetes Ergebnis liefern', function (done) {
        db.withSQLFromFile('hw3/quantitative_bom.sql')
          .all({
            $assembly: '3D Drucker'
          },
          function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(20)
            // only checking the first row
            expect(results[0]).to.eql({ element: 'Teil_0119/A', totalQuantity: 115 })
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
            expect(results).to.have.length(20)
            done()
          })
      })
    })

    describe('Durchschnittliche Bearbeitungszeiten (`hw3/parts_average_production_time.sql`)', function () {
      it('soll ohne Fehler das erwartete Ergebnis liefern', function (done) {
        db.withSQLFromFile('hw3/parts_average_production_time.sql')
          .all(function (err, results) {
            expect(err).to.not.be.ok()
            expect(results).to.have.length(6)
            // not checking the actual values, because i'm not sure they are the same on every platform
            expect(results[0].partNumber).to.eql('Teil_0133/A')
            expect(results[1].partNumber).to.eql('Teil_0103/A')
            expect(results[2].partNumber).to.eql('Teil_0130/A')
            expect(results[3].partNumber).to.eql('Teil_0131/A')
            expect(results[4].partNumber).to.eql('Teil_0160/A')
            expect(results[5].partNumber).to.eql('Teil_0183/A')
            done()
          })
      })
    })
  })
})
