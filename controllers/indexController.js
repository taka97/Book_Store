const async = require('async')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const Author = require('../models/author')

/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find({})
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    var GenreChucks = []
    var chunkSize = 3
    for (var i = 0; i <= results.listGenres.length; i += chunkSize) {
      GenreChucks.push(results.listGenres.slice(i, i + chunkSize))
    }
    // Successful, so render.
    res.render('homepage', {
      layout: 'layoutHomepage',
      title: 'Nhà sách - Trang chủ',
      GenreChucks: GenreChucks,
      listGenres: results.listGenres
    })
    console.log(GenreChucks)
    console.log(results.listGenres)
  })
}

exports.getDigitalWallets = function (req, res, next) {
  res.render('digitalwallets', {
    layout: false
  })
}

exports.searchBook = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find()
        .exec(callback)
    },
    listAuthors: (callback) => {
      Author.find()
        .exec(callback)
    },
    listPublishers: (callback) => {
      Publisher.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    var GenreChucks = []
    var chunkSize = 3
    for (var i = 0; i <= results.listGenres.length; i += chunkSize) {
      GenreChucks.push(results.listGenres.slice(i, i + chunkSize))
    }
    // Successful, so render.
    res.render('search', {
      layout: 'layoutHomepage',
      title: 'Tìm kiếm sách nâng cao',
      csrfToken: req.csrfToken(),
      GenreChucks: GenreChucks,
      listGenres: results.listGenres,
      listAuthors: results.listAuthors,
      listPublishers: results.listPublishers
      // listBooks: results.listBookInstances
    })
    // console.log(results.listBookInstances)
  })
}
