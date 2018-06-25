const express = require('express')
const router = express.Router()

const genreAdminController = require('../controllers/genreAdminController')

/* GET admin/genre homepage. */
router.get('/', genreAdminController.getHomepage)

// for develop

// GET add genre (admin) page
router.get('/add', genreAdminController.getAddPage)

// GET edit genre (admin) page
router.get('/edit/:id', genreAdminController.getEditPage)

// GET delete genre (admin) page
router.get('/delete', genreAdminController.getDeletePage)

module.exports = router
