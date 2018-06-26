const async = require('async')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const BookInstance = require('../models/bookInstance')
require('../models/book')

// Get list all book in database
exports.listBooks = function (req, res, next) {
  async.parallel({
    listBookInstances: (callback) => {
      BookInstance.find({})
        .populate('book')
        .exec(callback)
    },
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
    res.render('book', {
      layout: 'layoutHomepage',
      title: 'Book Store',
      csrfToken: req.csrfToken(),
      GenreChucks: GenreChucks,
      listGenres: results.listGenres,
      listAuthors: results.listAuthors,
      listPublishers: results.listPublishers,
      listBooks: results.listBookInstances
    })
    // console.log(results.listBookInstances)
  })
}

exports.bookDetail = function (req, res, next) {
  async.parallel({
    BookInstance: (callback) => {
      BookInstance.findById(req.params.id)
        .populate({ path: 'book', populate: { path: 'author publisher genre' } })
        .exec(callback)
    },
    listGenres: (callback) => {
      Genre.find()
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
    res.render('bookDetail', {
      layout: 'layoutHomepage',
      title: 'Book Detail',
      csrfToken: req.csrfToken(),
      GenreChucks: GenreChucks,
      bookDetail: results.BookInstance
    })
    // console.log(results.BookInstance)
  })
}
