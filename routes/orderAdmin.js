const express = require('express')
const router = express.Router()

const orderAdminController = require('../controllers/orderAdminController')

/* GET admin/order homepage. */
router.get('/', orderAdminController.getHomepage)

module.exports = router
