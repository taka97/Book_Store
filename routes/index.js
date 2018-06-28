const express = require('express')
const router = express.Router()

const loginRouter = require('./login')
const cartRouter = require('./cart')
const bookRouter = require('./book')
const genreRouter = require('./genre')
const authorRouter = require('./author')
const publisherRouter = require('./publisher')

const indexController = require('../controllers/indexController')

/* GET login and register page */
router.use('/', loginRouter)

/* GET CART */
router.use('/cart', cartRouter)

/* GET BOOK Router */
router.use('/book', bookRouter)

/* GET GENRE Router */
router.use('/genre', genreRouter)

/* GET AUTHOR Router */
router.use('/author', authorRouter)

/* GET publisher Router */
router.use('/publisher', publisherRouter)

/* GET homepage. */
router.get('/', indexController.getHomepage)

router.get('/digital_wallets/dialog', indexController.getDigitalWallets)

router.get('/search', indexController.searchBook)

router.post('/search', indexController.searchBookInstance)
// GET about page
router.get('/about', indexController.getAboutPage)

// request send email
router.get('/send', indexController.sendVerifyEmail)

// verify email
router.get('/verify', indexController.verifyEmail)

router.get('/resend', indexController.resendVerifyEmail)

module.exports = router
