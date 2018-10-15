var db = require('../config/db.js')
var expect = require('expect.js')
var fs = require('fs')

describe('Lecture 1: User Management', function () {
  describe('Setup', function () {
    it('should run without an error', function (done) {
      db.withSQLFromFile('lecture1/migration_up.sql')
        .exec(function (err) {
          expect(err).not.to.be.ok()
          done()
        })
    })
  })

  describe('User', function () {
    it('should create default (non-admin) user without error', function (done) {
      db.withSQLFromFile('lecture1/user_add.sql')
        .run({
          $login: 'test',
          $hashedpassword: 'testpw'
        },
        function (err) {
          expect(err).not.to.be.ok()
          done()
        }
        )
    })

    it('should fail if the same user is inserted again', function (done) {
      db.withSQLFromFile('lecture1/user_add.sql')
        .run({
          $login: 'test',
          $hashedpassword: 'password'
        },
        function (err) {
          expect(err).to.be.ok()
          expect(err.code).to.be('SQLITE_CONSTRAINT')
          done()
        }
        )
    })

    it('should create default user with same password without error', function (done) {
      db.withSQLFromFile('lecture1/user_add.sql')
        .run({
          $login: 'test2',
          $hashedpassword: 'testpw'
        },
        function (err) {
          expect(err).not.to.be.ok()
          done()
        }
        )
    })

    it('should find the user', function (done) {
      db.withSQLFromFile('lecture1/user_find.sql')
        .get({
          $login: 'test'
        },
        function (err, user) {
          expect(err).not.to.be.ok()
          expect(user.login).to.eql('test')
          expect(user.admin).not.to.be.ok()
          done()
        }
        )
    })

    it('should return the password hash for the user', function (done) {
      db.withSQLFromFile('lecture1/user_auth.sql')
        .get({
          $login: 'test'
        },
        function (err, user) {
          expect(err).not.to.be.ok()
          expect(user).to.eql({ hashedpassword: 'testpw' })
          done()
        }
        )
    })

    it('should make an user an admin', function (done) {
      db.withSQLFromFile('lecture1/user_make_admin.sql')
        .run({
          $login: 'test'
        },
        function (err) {
          expect(err).not.to.be.ok()
          db.withSQLFromFile('lecture1/user_find.sql')
            .get({ $login: 'test' },
              function (err, user) {
                expect(err).to.not.be.ok()
                expect(user.login).to.eql('test')
                expect(user.admin).to.be.ok()
                done()
              }
            )
        }
        )
    })

    it('giving admin status to one user should leave other users unaffected', function (done) {
      db.withSQLFromFile('lecture1/user_find.sql')
        .get({ $login: 'test2' },
          function (err, user) {
            expect(err).to.not.be.ok()
            expect(user.login).to.eql('test2')
            expect(user.admin).to.not.be.ok()
            done()
          }
        )
    })

    it('should delete a user', function (done) {
      db.withSQLFromFile('lecture1/user_remove.sql')
        .run({
          $login: 'test'
        },
        function (err) {
          expect(err).not.to.be.ok()
          db.withSQLFromFile('lecture1/user_find.sql')
            .get({ $login: 'test' }, function (err, user) {
              expect(err).to.not.be.ok()
              expect(user).to.not.be.ok()
              done()
            })
        })
    })

    it('deleting should leave other users unaffected', function (done) {
      db.withSQLFromFile('lecture1/user_find.sql')
        .get({
          $login: 'test2'
        },
        function (err, user) {
          expect(err).to.not.be.ok()
          expect(user).to.be.ok()
          done()
        })
    })
  })

  describe('Modelling', function () {
    it('there should be at least one pdf (content is NOT automatically tested)', function (done) {
      fs.readdir('solutions/lecture1', function (err, files) {
        expect(err).to.not.be.ok()
        var patt1 = /\.pdf$/i
        var pdfs = files.filter(
          function (filename) {
            return !!filename.match(patt1)
          })
        expect(pdfs).to.not.be.empty()
        done()
      })
    })
  })
})
