const express = require('express')
const router = express.Router()

const loginRouter = require('./login')
const cartRouter = require('./cart')
const bookRouter = require('./book')

const indexController = require('../controllers/indexController')

/* GET homepage. */
router.get('/', indexController.getHomepage)

/* GET login and register page */
router.use('/', loginRouter)

/* GET CART */
router.use('/cart', cartRouter)

/* GET BOOK Router */
router.use('/book', bookRouter)

/* GET genre list */
router.get('/genre', indexController.getGenre)

/* GET book detail */
router.get('/bookdetail', indexController.getBookDetail)

module.exports = router
