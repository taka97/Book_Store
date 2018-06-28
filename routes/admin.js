const express = require('express')
const router = express.Router()
const loginProtected = require('../controllers/loginProtected')
const adminController = require('../controllers/adminController')

const authorAdminRouter = require('../routes/authorAdmin')
const publisherAdminRouter = require('../routes/publisherAdmin')
const genreAdminRouter = require('../routes/genreAdmin')
const bookAdminRouter = require('../routes/bookAdmin')
const accountAdminRouter = require('../routes/accountAdmin')
const bookInstanceRouter = require('../routes/bookInstanceAdmin')

/* GET admin homepage. */
router.get('/', loginProtected.isLoginAndAdmin, adminController.getHomepage)

/* GET change profile page. */
router.get('/profile', loginProtected.isLoginAndAdmin, adminController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', loginProtected.isLoginAndAdmin, adminController.getChangeProfile)

/* POST change profile request. */
router.post('/change-profile', loginProtected.isLoginAndAdmin, adminController.postChangeProfile)

/* POST change password request. */
router.post('/change-password', loginProtected.isLoginAndUser, adminController.postChangePassword)

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
router.use('/bookinstance', loginProtected.isLoginAndAdmin, bookInstanceRouter)

module.exports = router
