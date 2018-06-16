var express = require('express')
var router = express.Router()
var indexController = require('../controllers/indexController')

/* GET homepage. */
router.get('/', indexController.getHomepage)

router.get('/cart', indexController.getCart)

router.get('/genre', indexController.getGenre)

// for developer
router.get('/bookdetail', (req, res, next) => {
  res.render('bookDetailPage', {
    layout: 'layoutHomepage',
    title: 'Chi tiết sách'})
})

module.exports = router
