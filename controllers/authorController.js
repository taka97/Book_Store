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

exports.postAddPage = function(req,res,next){
  console.log("áhdjkáhdkjahsdjkáhdkjahgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
  var newAuthor = new Author({
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender,
    nationality: req.body.national
  });
  newAuthor.save(function(err){
    console.log("áhdjkáhdkjahsdjkáhdkjahgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
    if(err) throw err;
    else
        res.redirect('/admin/author/add')
  })
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
