var boot = require('../bin/www').boot
var shutdown = require('../bin/www').shutdown
var port = require('../bin/www').port
var superagent = require('superagent')
var expect = require('expect.js')
var db = require('../config/db')

describe('http', function () {
  before('start', function () {
    // before we run this tests, we purge all tables from the database.
    db.exec(
      `PRAGMA writable_schema = 1;
      delete from sqlite_master where type in ('table', 'index', 'trigger');
      PRAGMA writable_schema = 0;
      VACUUM;
      PRAGMA INTEGRITY_CHECK;`
    )
    boot()
  })

  after('shutdown', function () {
    shutdown()
  })

  describe('server', function () {
    it('should respond to GET', function (done) {
      superagent
        .get('http://localhost:' + port)
        .end(function (err, res) {
          expect(err).to.not.be.ok()
          expect(res.status).to.equal(200)
          done()
        })
    })
  })
})
