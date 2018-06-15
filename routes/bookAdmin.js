const express = require('express')
const router = express.Router()

const bookAdminController = require('../controllers/bookAdminController')

/* GET admin/book homepage. */
router.get('/', bookAdminController.getHomepage)

module.exports = router
