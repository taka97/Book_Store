const async = require('async')
const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')

// GET book (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listBooks: (callback) => {
      Book.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/bookHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý sách',
      listBooks: results.listBooks
    })
    console.log('listBooks: ' + results.listBooks)
  })
}

// for develop
// GET add book (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách'
  })
}

// GET view book (admin) page
exports.getViewPage = function (req, res, next) {
  async.parallel({
    bookDetail: (callback) => {
      Book.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/bookView', {
      layout: 'layoutAdmin',
      title: 'Xem sách',
      book: results.bookDetail
    })
    console.log('book: ' + results.bookDetail)
  })

}

// GET edit book (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    bookDetail: (callback) => {
      Book.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/bookEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa sách',
      book: results.bookDetail
    })
    console.log('book: ' + results.bookDetail)
  })
}

// GET delete book (admin) page
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    listBookInstance: (callback) => {
      BookInstance.find({ book: req.params.id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/bookDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa sách',
      listBookInstance: results.listBookInstance
    })
    console.log('listBookInstance: ' + results.listBookInstance)
  })
}
