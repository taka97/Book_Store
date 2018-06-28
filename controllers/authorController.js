const async = require('async')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const BookInstance = require('../models/bookInstance')
require('../models/book')

// Redirect to /book
exports.redirectToBook = function (req, res, next) {
  res.redirect('/book')
}

// Get list all book of author
exports.listBooksAuthor = function (req, res, next) {
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
      var promise = new Promise((resolve, reject) => {
        BookInstance.find()
          .populate({ path: 'book', populate: { path: 'author' } })
          .exec((err, bookInstance) => {
            if (err) { return next(err) }
            resolve(bookInstance)
          })
      })
      promise.then((bookInstance) => {
        var bookLists = []
        for (let i = 0; i < bookInstance.length; i++) {
          if (bookInstance[i].book.author.id === req.params.id) {
            bookLists.push(bookInstance[i])
          }
        }
        callback(null, bookLists)
      })
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
      listPublishers: results.listPublisher,
      listBooks: results.listBookInstances
    })
    // console.log(results.listBookInstances)
  })
}
