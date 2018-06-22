const express = require('express')
const csrf = require('csurf')
const router = express.Router()
const loginController = require('../controllers/loginController')
const csrfProtection = csrf()
router.use(csrfProtection)

// GET Login page
router.get('/login', loginController.getLoginPage)

// GET Register page
router.get('/register', loginController.getRegisterPage)

// POST request to login
router.post('/login', loginController.postLogin)

// POST request to register
router.post('/register', loginController.postRegister)

module.exports = router
