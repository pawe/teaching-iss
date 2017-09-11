var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.get('/:hw/:file.md', function (req, res, next) {
  // looks dangerous
  res.render(req.params.file, {
    title: 'Hausübung',
    user: req.user
  })
})

module.exports = router
