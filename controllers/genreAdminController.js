const async = require('async')
const cache = require('memory-cache')

const Genre = require('../models/genre')
const Book = require('../models/book')

/**
 * GET genre (admin) homepage
 */
exports.getHomepage = function (req, res, next) {
  var listGenres = cache.get('listGenres')
  var hasUpdate = cache.get('updateListGenres')
  var message = req.flash('msg')[0]

  if (!listGenres || hasUpdate) { // listGenres is not cached or hasUpdate
    async.parallel({
      listGenres: (callback) => {
        Genre.find()
          .exec(callback)
      }
    }, (err, results) => {
      if (err) { return next(err) }
      cache.put('listGenres', results.listGenres)
      // Successful, so render.
      res.render('management/genreHomepage', {
        layout: 'layoutAdmin',
        title: 'Quản lý thể loại',
        csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
        listGenres: results.listGenres,
        message: message,
        noMessage: !message
      })
    })
    cache.del('updateListGenres')
  } else {
    // Successful, so render.
    res.render('management/genreHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý thể loại',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      listGenres: listGenres,
      message: message,
      noMessage: !message
    })
  }
}

/**
 * GET add genre (admin) page
 */
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/genreAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm thể loại'
  })
}

/**
 * GET edit genre (admin) page
 */
exports.getEditPage = function (req, res, next) {
  async.parallel({
    genreDetail: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/genreEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa thể loại',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      genre: results.genreDetail
    })
  })
}

/**
 * GET delete genre (admin) page
 */
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    genreDetail: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback)
    },
    listBooksGenre: (callback) => {
      Book.find({ genre: req.params.id })
        .populate('author')
        .populate('publisher')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/genreDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa thể loại',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      genre: results.genreDetail,
      listBooksGenre: results.listBooksGenre,
      hasBook: results.listBooksGenre.length
    })
  })
}

// POST add genre
exports.postAdd = function (req, res, next) {
  var newGenre = new Genre({
    name: req.body.name
  })
  newGenre.save(function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/genre')
    }
  })
}

// POST edit genre
exports.postEdit = function (req, res, next) {
  var editGenre = new Genre({
    _id: req.params.id,
    name: req.body.name,
  })
  Genre.findByIdAndUpdate(req.params.id, editGenre, function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/genre')
    }
  })
}

// POST delete genre
exports.postDelete = function (req, res, next) {
  Genre.findByIdAndRemove(req.params.id, function (err) {
    if (err) throw err;
    else
      res.redirect('/admin/genre');
  })
}
