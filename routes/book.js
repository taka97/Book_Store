var express = require('express')
var router = express.Router()

var bookController = require('../controllers/bookController')

/* GET list all book page. */
router.get('/', bookController.listBooks)

/* GET book detail */
router.get('/:id', bookController.bookDetail)

module.exports = router
