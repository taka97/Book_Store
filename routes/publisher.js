var express = require('express')
var router = express.Router()

var publisherController = require('../controllers/publisherController')

// Redirect to /book
router.get('/', publisherController.redirectToBook)

// Get list all book of publisher
router.get('/:id', publisherController.listBookPublisher)

module.exports = router
