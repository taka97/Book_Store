var express = require('express')
var router = express.Router()

var publisherController = require('../controllers/publisherController')

/* GET home page. */
// router.get('/', publisherController.listBooks)

router.get('/:id', publisherController.listBookPublisher)

module.exports = router
