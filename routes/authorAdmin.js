const express = require('express')
const router = express.Router()

const authorAdminController = require('../controllers/authorAdminController')

/* GET admin/author homepage. */
router.get('/', authorAdminController.getHomepage)

// for developer

// GET add author (admin) page
router.get('/add', authorAdminController.getAddPage)

// GET edit author (admin) page
router.get('/edit', authorAdminController.getEditPage)

// GET delete author (admin) page
router.get('/delete', authorAdminController.getDeletePage)

module.exports = router
