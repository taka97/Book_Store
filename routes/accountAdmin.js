const express = require('express')
const router = express.Router()

const accountAdminController = require('../controllers/accountAdminController')

/* GET account page. */
router.get('/', accountAdminController.getHomepage)

/* GET view account (admin) page */
router.get('/view', accountAdminController.getViewPage)

/* GET change account (admin) page */
router.get('/edit', accountAdminController.getEditPage)

/* GET upgrade account (admin) page */
router.get('/upgrade', accountAdminController.getUpgradePage)

/* GET delete account (admin) page */
router.get('/delete', accountAdminController.getDeletePage)

/* GET block account (admin) page */
router.get('/block', accountAdminController.getBlockPage)

/* POST edit account (admin) page */
// router.get('/edit/:id', accountAdminController.getEditPage)

module.exports = router
