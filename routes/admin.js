const express = require('express')
const router = express.Router()

const authorAdminRouter = require('../routes/authorAdmin')

const adminController = require('../controllers/adminController')

/* GET admin homepage. */
router.get('/', adminController.getHomepage)

/* Make middleware for /admin/author */
router.use('/author', authorAdminRouter)

module.exports = router
