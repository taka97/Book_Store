const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountController')

/* GET account page. */
router.get('/', accountController.getHomepage)

/* GET view account (admin) page */
router.get('/view', accountController.getViewPage)

/* GET upgrade account (admin) page */
router.get('/upgrade', accountController.getUpgradePage)

/* GET delete account (admin) page */
router.get('/delete', accountController.getDeletePage)

/* GET block account (admin) page */
router.get('/block', accountController.getBlockPage)

module.exports = router
