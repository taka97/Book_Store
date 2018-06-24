const express = require('express')
const router = express.Router()
const loginRouter = require('./login')
const cartRouter = require('./cart')

const indexController = require('../controllers/indexController')

/* GET login and register page */
router.use('/', loginRouter)

/* GET CART */
router.use('/cart', cartRouter)

/* GET homepage. */
router.get('/', indexController.getHomepage)

/* GET genre list */
router.get('/genre', indexController.getGenre)

/* GET book detail */
router.get('/bookdetail', indexController.getBookDetail)

module.exports = router
