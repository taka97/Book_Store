var express = require('express')
var router = express.Router()

var authorController = require('../controllers/authorController')

/* GET home page. */
// router.get('/', authorController.author)

router.get('/:id', authorController.listBooksAuthor)

module.exports = router
