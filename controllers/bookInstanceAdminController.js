const async = require('async')
const BookInstance = require('../models/bookInstance')
require('../models/book')

// GET bookInstance (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listBooks: (callback) => {
      BookInstance.find()
        .populate('book')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookInstanceHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý sản phẩm',
      listBooks: results.listBooks
    })
    console.log('listBooks: ' + results.listBooks)
  })
}

// for developer
// GET view bookInstance (admin) page
exports.getViewPage = function (req, res, next) {
  async.parallel({
    bookinstanceDetail: (callback) => {
      BookInstance.findById(req.params.id)
        .populate({ path: 'book', populate: { path: 'author publisher genre' } })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookInstanceView', {
      layout: 'layoutAdmin',
      title: 'Xem thông tin sản phẩm',
      bookinstance: results.bookinstanceDetail
    })
    console.log('bookinstance: ' + results.bookinstanceDetail)
  })
}

// GET add bookInstance (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/bookInstanceAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sản phẩm'
  })
}

// GET edit bookInstance (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    bookinstanceDetail: (callback) => {
      BookInstance.findById(req.params.id)
        .populate({ path: 'book', populate: { path: 'author publisher genre' } })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookInstanceEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa sản phẩm',
      bookinstance: results.bookinstanceDetail
    })
    console.log('bookinstance: ' + results.bookinstanceDetail)
  })
}

// GET delete bookInstance (admin) page
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    bookinstanceDetail: (callback) => {
      BookInstance.findById(req.params.id)
        .populate({ path: 'book', populate: { path: 'author publisher genre' } })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
  // Successful, so render.
    res.render('management/bookInstanceDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa sản phẩm',
      bookinstance: results.bookinstanceDetail
    })
    console.log('bookinstance: ' + results.bookinstanceDetail)
  })
}
