const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

const authorAdminRouter = require('../routes/authorAdmin')
const publisherAdminRouter = require('../routes/publisherAdmin')
const genreAdminRouter = require('../routes/genreAdmin')
const bookAdminRouter = require('../routes/bookAdmin')

/* GET admin homepage. */
router.get('/', adminController.getHomepage)

/* GET change profile page. */
router.get('/profile', adminController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', adminController.getChangeProfile)

/* GET order page. */
router.get('/order', adminController.getOrderPage)

/* Make middleware for /admin/author */
router.use('/author', authorAdminRouter)

/* Make middleware for /admin/publisher */
router.use('/publisher', publisherAdminRouter)

/* Make middleware for /admin/genre */
router.use('/genre', genreAdminRouter)

/* Make middleware for /admin/book */
router.use('/book', bookAdminRouter)

module.exports = router
