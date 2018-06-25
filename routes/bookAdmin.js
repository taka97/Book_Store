const express = require('express')
const router = express.Router()

const bookAdminController = require('../controllers/bookAdminController')

/* GET admin/book homepage. */
router.get('/', bookAdminController.getHomepage)

// for develop
// GET add book (admin) page
router.get('/add', bookAdminController.getAddPage)

// GET view book (admin) page
router.get('/view/:id', bookAdminController.getViewPage)

// GET edit book (admin) page
router.get('/edit/:id', bookAdminController.getEditPage)

// GET delete book (admin) page
router.get('/delete/:id', bookAdminController.getDeletePage)

module.exports = router
