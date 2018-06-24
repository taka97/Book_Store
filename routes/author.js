var express = require('express')
var router = express.Router()

var authorController = require('../controllers/authorController')

// Redirect to /book
router.get('/', authorController.redirectToBook)

// Get list all book of author
router.get('/:id', authorController.listBooksAuthor)

module.exports = router
