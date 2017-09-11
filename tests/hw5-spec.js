var db = require('../config/db.js')
var expect = require('expect.js')
var async = require('async')

describe('Hausübung 5', function () {
  it('should be somehow dependend on the matrikelnumber', function (done) {
    var student = require('../.student.json')

    var sum = student.matrikelnummer.split('').reduce((left, right) => left += parseInt(right, 10), 0)

    expect(sum).to.be(result from query)
    done()
  })
})
