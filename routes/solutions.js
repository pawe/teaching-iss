var express = require('express')
var router = express.Router()
var fs = require('fs')

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.get('/:homework/:file.sql', function (req, res, next) {
  return next(new Error('Sorry, this was a bad idea'))

  res.type('text/plain')
  // security wise, this is so very bad
  var path = 'solutions/' + req.params.homework + '/' + req.params.file + '.sql'
  fs.createReadStream(path).pipe(res)

  /* TODO: render editor
  res.render(editor, {
    content:
    path:
    title: 'Hausübung',
    user: req.user
  })
  */
})

router.post('/:homework/:file.sql', function (req, res, next) {
  return next(new Error('Sorry, this was a bad idea'))
})

module.exports = router
