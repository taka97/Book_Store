const express = require('express')
const router = express.Router()

const bookInstanceAdminController = require('../controllers/bookInstanceAdminController')

/* GET admin/genre homepage. */
router.get('/', bookInstanceAdminController.getHomepage)

// for developer
// GET add book instance (admin) page
router.get('/add', bookInstanceAdminController.getAddPage)

// GET view book instance (admin) page
router.get('/view/:id', bookInstanceAdminController.getViewPage)

// GET edit book instance (admin) page
router.get('/edit/:id', bookInstanceAdminController.getEditPage)

// GET delete book instance (admin) page
router.get('/delete/:id', bookInstanceAdminController.getDeletePage)

//Search bookInstance
router.post('../search', bookInstanceAdminController.searchBookInstance);
module.exports = router
