const async = require('async')
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')

// Get list all book in database
exports.listBooks = function (req, res, next) {
  async.parallel({
    listBooks: (callback) => {
      Book.find({}, 'title author price imageCover')
        .populate('author')
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

    // Successful, so render.
    res.render('book', {
      title: 'Book Store',
      listGenres: results.listGenres,
      listAuthors: results.listAuthors,
      listPublishers: results.listPublishers,
      listBooks: results.listBooks
    })

    // console.log(results.listAuthors)
  })
}

exports.bookDetail = function (req, res, next) {
  async.parallel({
    bookDetail: (callback) => {
      // console.log(req.params.id)
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .populate('publisher')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // console.log(results.listGenres)
    console.log(results.bookDetail)
    // console.log(result.bookRelative)
    // Successful, so render.
    res.render('bookDetail', {
      // layout: 'layoutUserWithoutSideBar',
      title: 'Book Detail',
      BookDetail: results.bookDetail
    })
  })
}
