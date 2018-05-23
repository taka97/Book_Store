var express = require('express')
var router = express.Router()

var bookController = require('../controllers/bookController')

/* GET home page. */
router.get('/', bookController.listBooks)

router.get('/:id', bookController.bookDetail)

module.exports = router
