const express = require('express')
const csrf = require('csurf')
const router = express.Router()
const loginController = require('../controllers/loginController')
const csrfProtection = csrf()
router.use(csrfProtection)

// GET Login page
router.get('/', loginController.login)

router.post('/signup', function (req, res, next) {
  res.send('đăng ký thành công')
})

router.post('/signin', function (req, res, next) {
  res.send('đăng nhập thành công')
})

module.exports = router
