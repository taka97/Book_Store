const async = require('async')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')
const Author = require('../models/author')
const Mailer = require('../controllers/sendEmailController')
const Account = require('../models/account')

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
    // console.log(GenreChucks)
    // console.log(results.listGenres)
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
