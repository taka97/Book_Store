const express = require('express')
const router = express.Router()

const publisherAdminController = require('../controllers/publisherAdminController')

/* GET admin/publisher homepage. */
router.get('/', publisherAdminController.getHomepage)

// for develop
// GET add publisher (admin) page
router.get('/add', publisherAdminController.getAddPage)

// GET edit publisher (admin) page
router.get('/edit/:id', publisherAdminController.getEditPage)

// GET delete publisher (admin) page
router.get('/delete/:id', publisherAdminController.getDeletePage)

module.exports = router
