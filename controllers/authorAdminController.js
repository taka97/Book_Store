const async = require('async')
const cache = require('memory-cache')

const Author = require('../models/author')
const Book = require('../models/book')

// GET author (admin) homepage

/**
 * GET author (admin) homepage
 */
exports.getHomepage = function (req, res, next) {
  var listAuthors = cache.get('listAuthors')
  var hasUpdate = cache.get('updateListAuthors')
  var message = req.flash('msg')[0]

  if (!listAuthors || hasUpdate) { // listAuthors is not cached or hasNewAuthor
    async.parallel({
      listAuthors: (callback) => {
        Author.find()
          .exec(callback)
      }
    }, (err, results) => {
      if (err) { return next(err) }
      cache.put('listAuthors', results.listAuthors)
      // Successful, so render.
      res.render('management/authorHomepage', {
        layout: 'layoutAdmin',
        title: 'Quản lý tác giả',
        csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request,
        listAuthors: results.listAuthors,
        message: message,
        noMessage: !message
      })
    })
  } else {
    // Successful, so render.
    res.render('management/authorHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý tác giả',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request,
      listAuthors: listAuthors,
      message: message,
      noMessage: !message
    })
  }
  cache.del('updateListAuthors')
}

/**
 * GET add author (admin) page
 */
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/authorAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm tác giả',
    csrfToken: req.csrfToken()
  })
}

/**
 * GET edit author (admin) page
 */
exports.getEditPage = function (req, res, next) {
  async.parallel({
    authorDetail: (callback) => {
      Author.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/authorEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa tác giả',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      author: results.authorDetail
    })
    console.log(cache.get('listAuthors'))
  })
}

/**
 * GET delete author (admin) page
 */
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    authorDetail: (callback) => {
      Author.findById(req.params.id)
        .exec(callback)
    },
    listBooksAuthor: (callback) => {
      Book.find({ author: req.params.id })
        .populate('publisher')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/authorDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa tác giả',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      user: req.user,
      author: results.authorDetail,
      listBooksAuthor: results.listBooksAuthor,
      hasBook: results.listBooksAuthor.length
    })
  })
}

/**
 * POST add author (admin) page
 */
exports.postAdd = function (req, res, next) {
  var newAuthor = new Author({
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender === 'male' ? 'Nam' : 'Nữ',
    nationality: req.body.national
  })
  newAuthor.save((err) => {
    if (err) throw err
    cache.put('updateListAuthors', true)
    req.flash('msg', 'Thêm tác giả thành công')
    res.redirect('/admin/author')
  })
}

/**
 * POST edit author (admin) page
 */
exports.postEdit = function (req, res, next) {
  var newData = {
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender === 'male' ? 'Nam' : 'Nữ',
    nationality: req.body.national
  }
  Author.findByIdAndUpdate(req.params.id, newData, (err) => {
    if (err) { return next(err) }
    cache.put('updateListAuthors', true)
    req.flash('msg', 'Thay đổi thông tin tác giả thành công')
    res.redirect('/admin/author')
  })
}

/**
 * POST delete author (admin) page
 */
exports.postDelete = function (req, res, next) {
  Author.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err) }
    cache.put('updateListAuthors', true)
    req.flash('msg', 'Xóa tác giả thành công')
    res.redirect('/admin/author')
  })
}
