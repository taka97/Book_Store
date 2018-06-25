const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

const authorAdminRouter = require('../routes/authorAdmin')
const publisherAdminRouter = require('../routes/publisherAdmin')
const genreAdminRouter = require('../routes/genreAdmin')
const bookAdminRouter = require('../routes/bookAdmin')
const accountAdminRouter = require('../routes/accountAdmin')
const bookInstanceRouter = require('../routes/bookInstanceAdmin')

/* GET admin homepage. */
router.get('/', adminController.getHomepage)

/* GET change profile page. */
router.get('/profile', adminController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', adminController.getChangeProfile)

/* GET order page. */
router.get('/order', adminController.getOrderPage)

/* GET logout request */
router.get('/logout', adminController.logout)

/* Make middleware for /admin/author */
router.use('/author', authorAdminRouter)

/* Make middleware for /admin/publisher */
router.use('/publisher', publisherAdminRouter)

/* Make middleware for /admin/genre */
router.use('/genre', genreAdminRouter)

/* Make middleware for /admin/book */
router.use('/book', bookAdminRouter)

/* Make middleware for /admin/account */
router.use('/account', accountAdminRouter)

/* Make middleware for /admin/bookinstance */
router.use('/bookinstance', bookInstanceRouter)

module.exports = router
