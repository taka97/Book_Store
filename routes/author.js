var express = require('express')
var router = express.Router()

var authorController = require('../controllers/authorController')

/* GET author page. -> redirect to /book */
router.get('/', authorController.getListAuthor)

router.get('/:id', authorController.listBooksAuthor)

module.exports = router
