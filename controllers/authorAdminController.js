const async = require('async')
const Author = require('../models/author')
const Book = require('../models/book')

// GET author (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listAuthors: (callback) => {
      Author.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/authorHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý tác giả',
      listAuthors: results.listAuthors
    })
    console.log('listAuthor:' + results.listAuthors)
  })
}

// for developer
// GET add author (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm tác giả'
  })
}

// GET edit author (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    authorDetail: (callback) => {
      Author.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/authorEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa tác giả',
      author: results.authorDetail
    })

    console.log('Author Detail: ' + results.authorDetail)
  })
}

// GET delete author (admin) page
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    listBooksAuthor: (callback) => {
      Book.find({ author: req.params.id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/authorDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa tác giả',
      listBooksAuthor: results.listBooksAuthor
    })

    console.log('List Books of Author:' + results.listBooksAuthor)
  })
}
