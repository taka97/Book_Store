const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/* GET admin homepage. */
router.get('/', userController.getHomepage)

module.exports = router
