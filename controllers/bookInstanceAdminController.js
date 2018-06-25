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
    res.render('account/bookInstanceHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý sách',
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
        .populate({path: 'book', populate: {path: 'author publisher genre'}})
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/bookInstanceView', {
      layout: 'layoutAdmin',
      title: 'Xem thông tin sách',
      bookinstance: results.bookinstanceDetail
    })
    console.log('bookinstance: ' + results.bookinstanceDetail)
  })
}

// GET add bookInstance (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách'
  })
}

// GET edit bookInstance (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa sách'
  })
}

// GET delete bookInstance (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa sách'
  })
}
