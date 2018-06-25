const async = require('async')
const Publisher = require('../models/publisher')
const Book = require('../models/book')

// GET publisher (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listPublishers: (callback) => {
      Publisher.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/publisherHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý nhà xuất bản',
      listPublishers: results.listPublishers
    })

    console.log('listPublishers: ' + results.listPublishers)
  })
}

// for develop
// GET add publisher (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/publisherAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm nhà xuất bản'
  })
}

// GET edit publisher (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    publisherDetail: (callback) => {
      Publisher.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/publisherEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa nhà xuất bản',
      publisher: results.publisherDetail
    })

    console.log('publisher:' + results.publisherDetail)
  })
}

// GET delete publisher (admin) page
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    listBooksAuthor: (callback) => {
      Book.find({ publisher: req.params.id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/publisherDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa sách',
      listBooksAuthor: results.listBooksAuthor
    })

    console.log('listBooksAuthor: ' + results.listBooksAuthor)
  })
}
