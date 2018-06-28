const async = require('async')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const Author = require('../models/author')
const Mailer = require('../controllers/sendEmailController')
const Account = require('../models/account')
const BookInstance = require('../models/bookInstance')
const Book = require('../models/book')

/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find({})
        .exec(callback)
    },
    listBookInstance: (callback) => {
      BookInstance.find()
        .populate({ path: 'book', populate: { path: 'author publisher genre' } })
        .limit(4)
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
      csrfToken: req.csrfToken(),
      GenreChucks: GenreChucks,
      listGenres: results.listGenres,
      listBooks: results.listBookInstance
    })
    // console.log(results.listBookInstance)
  })
}

exports.getDigitalWallets = function (req, res, next) {
  res.render('digitalwallets', {
    layout: false
  })
}

// GET about page
exports.getAboutPage = function (req, res, next) {
  Genre.find()
    .exec((err, listGenres) => {
      if (err) { return next(err) }
      var GenreChucks = []
      var chunkSize = 3
      for (var i = 0; i <= listGenres.length; i += chunkSize) {
        GenreChucks.push(listGenres.slice(i, i + chunkSize))
      }
      res.render('about', {
        layout: 'layoutHomepage',
        GenreChucks: GenreChucks
      })
      console.log('About')
    })
}

// send verify link to email
exports.sendVerifyEmail = function (req, res, next) {
  let link = `http://${req.get('host')}/verify?id=${req.user.id}&token=${req.user.token}`
  Mailer.sendVerifyEmail(req.query.email, link)
  res.redirect('/')
}

// check verify email link
exports.verifyEmail = function (req, res, next) {
  Account.findById(req.query.id)
    .exec((err, account) => {
      if (err) { return next(err) }
      // link is valid
      if (account.token === req.query.token) {
        account.isVerify = true
        account.token = ''
        account.save((err, account) => {
          if (err) { return next(err) }
          req.user = account
          res.render('notifyEmail', {
            layout: false,
            isVerify: true
          })
          console.log('Link is valid. Email is verified')
        })
      } else { // invalid link
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
          res.render('notifyEmail', {
            layout: 'layoutHomepage',
            title: 'Xác thực email',
            GenreChucks: GenreChucks,
            isVerify: false
          })
        })
        console.log('Link is invalid')
      }
    })
}

exports.resendVerifyEmail = function (req, res, next) {
  let link = `http://${req.get('host')}/verify?id=${req.user.id}&token=${req.user.token}`
  Mailer.sendVerifyEmail(req.query.email, link)
  res.redirect('/')
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
    },
    listBookInstance: (callback) => {
      BookInstance.find()
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
    console.log('Search')
    // console.log(results.listBookInstances)
  })
}

// POST search bookInstance
exports.searchBookInstance = function (req, res, next) {
  console.log('da vao index')
<<<<<<< HEAD
  var bookInsChuck = []
  BookInstance.find({ $text: { $search: req.body.keyword } })
    .populate('book')
    .exec((err, docs) => {
      if (err) throw err
      bookInsChuck.push(docs.slice(0, docs.length))
      // console.log(docs);
      res.render('search', {
        title: 'Group-BookIns',
        layout: 'layoutHomepage',
        // csrfToken: req.csrfToken(),
        listBooks: bookInsChuck
        // name: req.body.keyword
      })
      console.log('searchbookInstance')
      console.log('size: ' + bookInsChuck.size)
      console.log('listBook: ' + bookInsChuck)
      console.log('keet thuc listBook')
    })
}
=======
  var bookInsChuck = [];
  var bookChuck = [];
  var promise = new Promise((resolve, reject) => {
    Book.find({ $text: { $search: req.body.keyword } })
      .populate('author')
      .exec((err, product) => {
        if (err) {
          return res.redirect('/search')
        }
        resolve(product)
      })
  }).then(bookas => {
    console.log('id book: ')
    console.log(bookas)
    // tempBook = books;
    BookInstance.find({ book: bookas[0]._id }).populate('book').exec(function (err, docs) {
      if (err) throw err;
      console.log('nasjdknsadnlaskdnlaks')
      console.log(docs);
      res.render('search', {
        layout: 'layoutHomepage',
        title: 'Group-BookIns',
        listBooks: docs
      })
    })
  })
}
>>>>>>> 66566c68b434fee2317e8b5e13ffe92f0fe9f8e0
