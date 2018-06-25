const express = require('express')
const router = express.Router()

const bookInstanceAdminController = require('../controllers/bookInstanceAdminController')

/* GET admin/genre homepage. */
router.get('/', bookInstanceAdminController.getHomepage)

// for developer
// GET view genre (admin) page
router.get('/view', bookInstanceAdminController.getViewPage)

// GET add genre (admin) page
router.get('/add', bookInstanceAdminController.getAddPage)

// GET edit genre (admin) page
router.get('/edit', bookInstanceAdminController.getEditPage)

// GET delete genre (admin) page
router.get('/delete', bookInstanceAdminController.getDeletePage)

module.exports = router
