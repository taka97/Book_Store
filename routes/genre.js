var express = require('express')
var router = express.Router()

var genreController = require('../controllers/genreController')

/* GET home page. */
// router.get('/', bookController.listBooks)

router.get('/:id', genreController.genreDetail)

module.exports = router
