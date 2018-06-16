const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountController')

/* GET account page. */
router.get('/', accountController.getHomepage)

module.exports = router
