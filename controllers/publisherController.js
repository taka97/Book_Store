const async = require('async')
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')

// Redirect to /book
exports.redirectToBook = function (req, res, next) {
  res.redirect('/book')
}

// Get list all book of author
exports.listBookPublisher = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find({})
        .exec(callback)
    },
    listAuthors: (callback) => {
      Author.find({})
        .exec(callback)
    },
    listPublisher: (callback) => {
      Publisher.find({})
        .exec(callback)
    },
    listBooks: (callback) => {
      Book.find({ 'publisher': req.params.id })
        .populate('author')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.listGenres == null) { // No results.
      err = new Error('Genre not found')
      err.status = 404
      return next(err)
    }
    // Successful, so render.
    res.render('book', {
      layout: 'layoutHomepage',
      title: 'Book Store',
      listGenres: results.listGenres,
      listAuthors: results.listAuthors,
      listPublishers: results.listPublisher,
      listBooks: results.listBooks
    })

    console.log(results.listBooks)
  })
}
