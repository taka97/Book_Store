const express = require('express')
const router = express.Router()
const loginProtected = require('../controllers/loginProtected')
const userController = require('../controllers/userController')

/* GET admin homepage. */
router.get('/', loginProtected.isLoginAndUser, userController.getHomepage)

/* GET change profile page. */
router.get('/profile', loginProtected.isLoginAndUser, userController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', loginProtected.isLoginAndUser, userController.getChangeProfile)

/* GET order page. */
router.get('/order', loginProtected.isLoginAndUser, userController.getOrderPage)

/* GET logout request */
router.get('/logout', loginProtected.isLoginAndUser, userController.logout)

/* POST change password page. */
router.post('/change-profile', loginProtected.isLoginAndUser, userController.postChangeProfile)

module.exports = router
