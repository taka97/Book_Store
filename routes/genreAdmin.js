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
router.get('/delete/:id', genreAdminController.getDeletePage)

// POST add genre (admin) page
router.post('/add', genreAdminController.postAdd)

// POST edit genre (admin) page
router.post('/edit/:id', genreAdminController.postEdit)

// POST delete genre (admin) page
router.post('/delete/:id', genreAdminController.postDelete)
module.exports = router
