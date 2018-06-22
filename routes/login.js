const express = require('express')
const csrf = require('csurf')
const router = express.Router()
const loginController = require('../controllers/loginController')
const csrfProtection = csrf()
router.use(csrfProtection)

// GET Login page
router.get('/', loginController.getLoginPage)

router.get('/register', loginController.getSignuppage)

router.post('/register', loginController.postSignup)

router.post('/signin', loginController.postSignin)

module.exports = router
