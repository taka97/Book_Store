const async = require('async')
const cache = require('memory-cache')

const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')
const Author = require('../models/author')
const Genre = require('../models/genre')
const Publisher = require('../models/publisher')

/**
 * GET book (admin) homepage
 */
exports.getHomepage = function (req, res, next) {
  var listBooks = cache.get('listBooks')
  var hasUpdate = cache.get('updateListBooks')
  var message = req.flash('msg')[0]

  if (!listBooks || hasUpdate) {
    async.parallel({
      listBooks: (callback) => {
        Book.find()
          .populate('publisher')
          .populate('genre')
          .populate('author')
          .exec(callback)
      }
    }, (err, results) => {
      if (err) { return next(err) }
      cache.put('listBooks', results.listBooks)
      // Successful, so render.
      res.render('management/bookHomepage', {
        layout: 'layoutAdmin',
        title: 'Quản lý sách',
        listBooks: results.listBooks,
        csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
        message: message,
        noMessage: !message
      })
      cache.del('updateListBooks')
    })
  } else {
    // Successful, so render.
    res.render('management/bookHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý sách',
      listBooks: listBooks,
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      message: message,
      noMessage: !message
    })
  }
}

/**
 * GET add book (admin) page
 */
exports.getAddPage = function (req, res, next) {
  var listAuthors = cache.get('listAuthors')
  var listGenres = cache.get('listGenres')
  var listPublishers = cache.get('listPublishers')

  var hasUpdateAuthors = cache.get('updateListAuthors')
  var hasUpdateGenres = cache.get('updateListGenres')
  var hasUpdatePublishers = cache.get('updateListPublishers')

  if (!listAuthors || !listGenres || !listPublishers ||
    hasUpdateAuthors || hasUpdateGenres || hasUpdatePublishers) {
    async.parallel({
      listAuthors: (callback) => {
        if (!listAuthors || hasUpdateAuthors) {
          Author.find()
            .exec(callback)
        } else {
          callback(null, null)
        }
      },
      listGenres: (callback) => {
        if (!listGenres || hasUpdateGenres) {
          Genre.find()
            .exec(callback)
        } else {
          callback(null, null)
        }
      },
      listPublishers: (callback) => {
        if (!listPublishers || hasUpdatePublishers) {
          Publisher.find()
            .exec(callback)
        } else {
          callback(null, null)
        }
      }
    }, (err, results) => {
      if (err) { return next(err) }

      if (!listAuthors || hasUpdateAuthors) {
        listAuthors = results.listAuthors
        cache.put('listAuthors', results.listAuthors)
        cache.del('updateListAuthors')
      }

      if (!listGenres || hasUpdateGenres) {
        listGenres = results.listGenres
        cache.put('listGenres', results.listGenres)
        cache.del('updateListGenres')
      }

      if (!listPublishers || hasUpdatePublishers) {
        listPublishers = results.listPublishers
        cache.put('listPublishers', results.listPublishers)
        cache.del('updateListPublishers')
      }
      // Successful, so render.
      res.render('management/bookAdd', {
        layout: 'layoutAdmin',
        title: 'Thêm sách',
        csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
        listAuthors: listAuthors,
        listGenres: listGenres,
        listPublishers: listPublishers
      })
    })
  } else {
    // Successful, so render.
    res.render('management/bookAdd', {
      layout: 'layoutAdmin',
      title: 'Thêm sách',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      listAuthors: listAuthors,
      listGenres: listGenres,
      listPublishers: listPublishers
    })
  }
}

/**
 * GET view book (admin) page
 */
exports.getViewPage = function (req, res, next) {
  async.parallel({
    bookDetail: (callback) => {
      Book.findById(req.params.id)
        .populate('publisher')
        .populate('author')
        .populate('genre')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookView', {
      layout: 'layoutAdmin',
      title: 'Xem sách',
      book: results.bookDetail,
      csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
    })
  })
}

// GET edit book (admin) page
exports.getEditPage = function (req, res, next) {
  var listAuthors = cache.get('listAuthors')
  var listGenres = cache.get('listGenres')
  var listPublishers = cache.get('listPublishers')

  var hasUpdateAuthors = cache.get('updateListAuthors')
  var hasUpdateGenres = cache.get('updateListGenres')
  var hasUpdatePublishers = cache.get('updateListPublishers')

  async.parallel({
    listAuthors: (callback) => {
      if (!listAuthors || hasUpdateAuthors) {
        Author.find()
          .exec(callback)
      } else {
        callback(null, null)
      }
    },
    listGenres: (callback) => {
      if (!listGenres || hasUpdateGenres) {
        Genre.find()
          .exec(callback)
      } else {
        callback(null, null)
      }
    },
    listPublishers: (callback) => {
      if (!listPublishers || hasUpdatePublishers) {
        Publisher.find()
          .exec(callback)
      } else {
        callback(null, null)
      }
    },
    bookDetail: (callback) => {
      Book.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }

    if (!listAuthors || hasUpdateAuthors) {
      listAuthors = results.listAuthors
      cache.put('listAuthors', results.listAuthors)
      cache.del('updateListAuthors')
    }

    if (!listGenres || hasUpdateGenres) {
      listGenres = results.listGenres
      cache.put('listGenres', results.listGenres)
      cache.del('updateListGenres')
    }

    if (!listPublishers || hasUpdatePublishers) {
      listPublishers = results.listPublishers
      cache.put('listPublishers', results.listPublishers)
      cache.del('updateListPublishers')
    }
    // Successful, so render.
    res.render('management/bookEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa thông tin sách',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      listAuthors: listAuthors,
      listGenres: listGenres,
      listPublishers: listPublishers,
      book: results.bookDetail
    })
  })
}

// GET delete book (admin) page
exports.getDeletePage = function (req, res, next) {
  async.parallel({
    listBookInstance: (callback) => {
      BookInstance.find({ book: req.params.id })
        .populate('publisher')
        .populate('author')
        .populate('genre')
        .populate('book')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookDelete', {
      layout: 'layoutAdmin',
      title: 'Xóa sách',
      listBookInstance: results.listBookInstance,
      csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
    })
  })
}

// POST add book
exports.postAdd = function (req, res, next) {
  var newBook = new Book({
    title: req.body.name,
    author: req.body.author,
    publisher: req.body.publisher,
    publishDate: req.body.publishDate,
    price: req.body.price,
    genre: req.body.genre,
    description: req.body.description
  })
  newBook.save(function (err) {
    if (err) {
      return next(err)
    }
    cache.put('updateListBooks', true)
    req.flash('msg', 'Thêm sách thành công')
    res.redirect('/admin/book')
  })
}

// POST edit book
exports.postEdit = function (req, res, next) {
  var newData = {
    title: req.body.name,
    author: req.body.author,
    publisher: req.body.publisher,
    publishDate: req.body.publishDate,
    price: req.body.price,
    genre: req.body.genre,
    description: req.body.description
  }

  Book.findByIdAndUpdate(req.params.id, newData, function (err) {
    if (err) { return next(err) }
    cache.put('updateListBooks', true)
    req.flash('msg', 'Thay đổi thông tin sách thành công')
    res.redirect('/admin/book')
  })
}

// POST delete author
exports.postDelete = function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, function (err) {
    if (err) { return next(err) }
    res.redirect('/admin/book')
  })
}
