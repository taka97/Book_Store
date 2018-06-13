const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

// GET LogIn page
router.get('/', loginController.login)

module.exports = router
