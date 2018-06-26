const async = require('async')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const BookInstance = require('../models/bookInstance')
require('../models/book')

// Get list all genre in database
exports.listGenres = function (req, res, next) {
  res.redirect('/book')
}

// Get list all book in database
exports.bookOfGenre = function (req, res, next) {
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
    listBookInstances: (callback) => {
      BookInstance.find({})
        .populate('book')
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
      GenreChucks: GenreChucks,
      listGenres: results.listGenres,
      listAuthors: results.listAuthors,
      listPublishers: results.listPublisher,
      listBooks: results.listBookInstances
    })
    // console.log(results.listBookInstances)
  })
}
