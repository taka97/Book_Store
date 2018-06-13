const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

/* GET admin homepage. */
router.get('/admin', adminController.getHomepage)

/* GET user homepage. */
router.get('/user', userController.getHomepage)

module.exports = router
