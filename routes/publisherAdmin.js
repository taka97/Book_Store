const express = require('express')
const router = express.Router()

const publisherAdminController = require('../controllers/publisherAdminController')

/* GET admin/publisher homepage. */
router.get('/', publisherAdminController.getHomepage)

module.exports = router
