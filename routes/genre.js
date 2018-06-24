var express = require('express')
var router = express.Router()

var genreController = require('../controllers/genreController')

/* GET genre homepage. */
router.get('/', genreController.listGenres)

router.get('/:id', genreController.bookOfGenre)

module.exports = router
