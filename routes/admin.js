const express = require('express')
const router = express.Router()
const loginProtected = require('../controllers/loginProtected')
const adminController = require('../controllers/adminController')

const authorAdminRouter = require('./authorAdmin')
const publisherAdminRouter = require('./publisherAdmin')
const genreAdminRouter = require('./genreAdmin')
const bookAdminRouter = require('./bookAdmin')
const accountAdminRouter = require('./accountAdmin')
const bookInstanceAdminRouter = require('./bookInstanceAdmin')
const orderAdminRouter = require('./orderAdmin')

/* GET admin homepage. */
router.get('/', loginProtected.isLoginAndAdmin, adminController.getHomepage)

/* GET change profile page. */
router.get('/profile', loginProtected.isLoginAndAdmin, adminController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', loginProtected.isLoginAndAdmin, adminController.getChangeProfile)

/* POST change profile request. */
router.post('/change-profile', loginProtected.isLoginAndAdmin, adminController.postChangeProfile)

/* POST change password request. */
router.post('/change-password', loginProtected.isLoginAndAdmin, adminController.postChangePassword)

/* Make middleware for /admin/author */
router.use('/author', loginProtected.isLoginAndAdmin, authorAdminRouter)

/* Make middleware for /admin/publisher */
router.use('/publisher', loginProtected.isLoginAndAdmin, publisherAdminRouter)

/* Make middleware for /admin/genre */
router.use('/genre', loginProtected.isLoginAndAdmin, genreAdminRouter)

/* Make middleware for /admin/book */
router.use('/book', loginProtected.isLoginAndAdmin, bookAdminRouter)

/* Make middleware for /admin/account */
router.use('/account', loginProtected.isLoginAndAdmin, accountAdminRouter)

/* Make middleware for /admin/bookinstance */
router.use('/bookinstance', loginProtected.isLoginAndAdmin, bookInstanceAdminRouter)

/* Make middleware for /admin/order */
router.use('/order', loginProtected.isLoginAndAdmin, orderAdminRouter)

module.exports = router
