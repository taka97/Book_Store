const async = require('async')
const Genre = require('../models/genre')
const Book = require('../models/book')

// GET genre (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/genreHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý thể loại',
      listGenres: results.listGenres
    })
    console.log('listGenres: ' + results.listGenres)
  })
}

// for develop
// GET add genre (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/genreAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm thể loại'
  })
}

// GET edit genre (admin) page
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
      genre: results.genreDetail
    })
    console.log('genre: ' + results.genreDetail)
  })
}

// GET delete genre (admin) page
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
      genre: results.genreDetail,
      listBooksGenre: results.listBooksGenre
    })
    console.log('genreDetail: ' + results.genreDetail)
    console.log('listBooksGenre: ' + results.listBooksGenre)
  })
}
