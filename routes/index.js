const express = require('express')
const router = express.Router()
const loginRouter = require('./login')

const indexController = require('../controllers/indexController')

/* GET homepage. */
router.get('/', indexController.getHomepage)

router.use('/login', loginRouter)

/* GET cart */
router.get('/cart', indexController.getCart)

/* GET genre list */
router.get('/genre', indexController.getGenre)

/* GET book detail */
router.get('/bookdetail', (req, res, next) => {
  res.render('bookdetail', {
    layout: 'layoutHomepage',
    title: 'Chi tiết sách'})
})

module.exports = router
