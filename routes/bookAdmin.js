const express = require('express')
const router = express.Router()

const bookAdminController = require('../controllers/bookAdminController')

/* GET admin/book homepage. */
router.get('/', bookAdminController.getHomepage)

// GET add book (admin) page
router.get('/add', bookAdminController.getAddPage)

// GET view book (admin) page
router.get('/view/:id', bookAdminController.getViewPage)

// GET edit book (admin) page
router.get('/edit/:id', bookAdminController.getEditPage)

// GET delete book (admin) page
router.get('/delete/:id', bookAdminController.getDeletePage)

// POST add book (admin) page
router.post('/add', bookAdminController.postAdd)

// POST edit book (admin) page
router.post('/edit/:id', bookAdminController.postEdit)

// POST delete book (admin) page
router.post('/delete/:id', bookAdminController.postDelete)

module.exports = router
