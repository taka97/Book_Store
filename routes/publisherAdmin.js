const express = require('express')
const router = express.Router()

const publisherAdminController = require('../controllers/publisherAdminController')

/* GET admin/publisher homepage. */
router.get('/', publisherAdminController.getHomepage)

// for developer
// GET view publisher (admin) page
router.get('/view', publisherAdminController.getViewPage)

// GET add publisher (admin) page
router.get('/add', publisherAdminController.getAddPage)

// GET edit publisher (admin) page
router.get('/edit', publisherAdminController.getEditPage)

// GET delete publisher (admin) page
router.get('/delete', publisherAdminController.getDeletePage)

module.exports = router
