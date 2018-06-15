const express = require('express')
const router = express.Router()

const authorAdminController = require('../controllers/authorAdminController')

/* GET admin/author homepage. */
router.get('/', authorAdminController.getHomepage)

module.exports = router
