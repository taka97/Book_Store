const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/* GET admin homepage. */
router.get('/', userController.getHomepage)

/* GET change profile page. */
router.get('/profile', userController.getViewProfile)

/* GET change password page. */
router.get('/change-profile', userController.getChangeProfile)

/* GET order page. */
router.get('/order', userController.getOrderPage)

/* GET logout request */
router.get('/logout', userController.logout)

module.exports = router
