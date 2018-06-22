const express = require('express')
const csrf = require('csurf')
const router = express.Router()
const loginController = require('../controllers/loginController')
const csrfProtection = csrf()
router.use(csrfProtection)

// GET Login page
router.get('/login', loginController.getLoginPage)

router.get('/register', loginController.getRegisterPage)

router.post('/login', loginController.postLogin)

router.post('/register', loginController.postRegister)

module.exports = router
