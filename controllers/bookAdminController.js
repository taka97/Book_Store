const async = require('async')
const Book = require('../models/book')

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
  // Successful, so render.
  res.render('account/bookDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa sách'
  })
}
