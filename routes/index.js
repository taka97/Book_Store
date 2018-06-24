const express = require('express')
const router = express.Router()

const loginRouter = require('./login')
const cartRouter = require('./cart')
const bookRouter = require('./book')
const genreRouter = require('./genre')

const indexController = require('../controllers/indexController')

/* GET homepage. */
router.get('/', indexController.getHomepage)

/* GET login and register page */
router.use('/', loginRouter)

/* GET CART */
router.use('/cart', cartRouter)

/* GET BOOK Router */
router.use('/book', bookRouter)

router.use('/genre', genreRouter)

router.get('/digital_wallets/dialog', indexController.getDigitalWallets)

module.exports = router
