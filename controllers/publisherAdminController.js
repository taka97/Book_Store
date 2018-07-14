const async = require('async')
const cache = require('memory-cache')

const Publisher = require('../models/publisher')
const Book = require('../models/book')

/**
 * GET publisher (admin) homepage
 */
exports.getHomepage = function (req, res, next) {
  var listPublishers = cache.get('listPublishers')
  var hasUpdate = cache.get('updateListPublishers')
  var message = req.flash('msg')[0]

  if (!listPublishers || hasUpdate) { // listPublishers is not cached or hasUpdate
    async.parallel({
      listPublishers: (callback) => {
        Publisher.find()
          .exec(callback)
      }
    }, (err, results) => {
      if (err) { return next(err) }
      cache.put('listPublishers', results.listPublishers)
      // Successful, so render.
      res.render('management/publisherHomepage', {
        layout: 'layoutAdmin',
        title: 'Quản lý nhà xuất bản',
        csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
        listPublishers: results.listPublishers,
        message: message,
        noMessage: !message
      })
    })
    cache.del('updateListPublishers')
  } else {
    // Successful, so render.
    res.render('management/publisherHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý nhà xuất bản',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      listPublishers: listPublishers,
      message: message,
      noMessage: !message
    })
  }
}

/**
 * GET add publisher (admin) page
 */
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/publisherAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm nhà xuất bản',
    csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
  })
}

/**
 * GET edit publisher (admin) page
 */
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
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      publisher: results.publisherDetail
    })
  })
}

/**
 * GET delete publisher (admin) page
 */
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    publisherDetail: (callback) => {
      Publisher.findById(req.params.id)
        .exec(callback)
    },
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
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      publisher: results.publisherDetail,
      listBooksAuthor: results.listBooksAuthor,
      hasBook: results.listBooksAuthor.length
    })
  })
}

/**
 * POST add publisher (admin) page
 */
exports.postAdd = function (req, res, next) {
  var newPublisher = new Publisher({
    name: req.body.name
  })
  newPublisher.save(function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/publisher')
    }
  })
}

// POST edit publisher
exports.postEdit = function (req, res, next) {
  var editPublisher = new Publisher({
    _id: req.params.id,
    name: req.body.name
  })
  Publisher.findByIdAndUpdate(req.params.id, editPublisher, function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/publisher')
    }
  })
}

// POST delete publisher
exports.postDelete = function (req, res, next) {
  Publisher.findByIdAndRemove(req.params.id, function (err) {
    if (err) throw err;
    else
      res.redirect('/admin/publisher');
  })
}
