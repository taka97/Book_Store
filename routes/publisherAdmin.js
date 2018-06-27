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

// POST add publisher (admin) page
router.post('/add', publisherAdminController.postAdd)

// POST edit publisher (admin) page
router.post('/edit/:id', publisherAdminController.postEdit)

// POST delete publisher (admin) page
router.post('/delete/:id', publisherAdminController.postDelete)
module.exports = router
