var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  // res.redirect('/book')
  res.render('homepage', {title: 'Nhà sách - Trang chủ', layout: 'layoutHomepage'})
})

module.exports = router
