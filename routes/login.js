const express = require('express')
const csrf = require('csurf')
const router = express.Router()
const loginController = require('../controllers/loginController')
const loginProtected = require('../controllers/loginProtected')
const csrfProtection = csrf()
router.use(csrfProtection)

// GET Login page
router.get('/login', loginProtected.notLoggedIn, loginController.getLoginPage)

// GET Register page
router.get('/register', loginProtected.notLoggedIn, loginController.getRegisterPage)

// POST request to login
router.post('/login', loginProtected.notLoggedIn, loginController.postLogin)

// POST request to register
router.post('/register', loginProtected.notLoggedIn, loginController.postRegister)

module.exports = router
