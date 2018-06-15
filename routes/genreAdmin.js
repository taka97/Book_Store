const express = require('express')
const router = express.Router()

const genreAdminController = require('../controllers/genreAdminController')

/* GET admin/genre homepage. */
router.get('/', genreAdminController.getHomepage)

module.exports = router
