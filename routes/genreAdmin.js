const express = require('express')
const router = express.Router()

const genreAdminController = require('../controllers/genreAdminController')

/* GET admin/genre homepage. */
router.get('/', genreAdminController.getHomepage)

// for developer
// GET view genre (admin) page
router.get('/view', genreAdminController.getViewPage)

// GET add genre (admin) page
router.get('/add', genreAdminController.getAddPage)

// GET edit genre (admin) page
router.get('/edit', genreAdminController.getEditPage)

// GET delete genre (admin) page
router.get('/delete', genreAdminController.getDeletePage)

module.exports = router
