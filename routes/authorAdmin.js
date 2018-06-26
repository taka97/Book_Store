const express = require('express')
const router = express.Router()

const authorAdminController = require('../controllers/authorAdminController')

/* GET admin/author homepage. */
router.get('/', authorAdminController.getHomepage)

// for develop
// GET add author (admin) page
router.get('/add', authorAdminController.getAddPage)

// GET edit author (admin) page
router.get('/edit/:id', authorAdminController.getEditPage)

// GET delete author (admin) page
router.get('/delete/:id', authorAdminController.getDeletePage)

//POST ađ author (admin) page
router.post('/add', authorAdminController.postAdd)
module.exports = router
