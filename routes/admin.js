const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

/* GET admin homepage. */
router.get('/', adminController.getHomepage)

module.exports = router
