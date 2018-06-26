const async = require('async')
const Book = require('../models/book')
const BookInstance = require('../models/bookInstance')

// GET book (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listBooks: (callback) => {
      Book.find()
      .populate('publisher')
      .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý sách',
      listBooks: results.listBooks,
      csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
    })
    console.log('listBooks: ' + results.listBooks)
  })
}

// exports.postAddPage = function(req,res){
//   var newBook = new Book({
//     title: req.body.name,
//     author: req.body.nameAuthor,
//     genre: req.body.genre,
//     price: req.body.price,
//     publisher: req.body.namePublisher,
//     publishDate: req.body.date
//   })
// }
// for develop
// GET add book (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/bookAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách',
    csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
  })
}

// GET view book (admin) page
exports.getViewPage = function (req, res, next) {
  async.parallel({
    bookDetail: (callback) => {
      Book.findById(req.params.id)
        .populate('publisher')
        .populate('author')
        .populate('genre')
        .exec(callback)
    },
    listBookInstance: (callback) => {
      BookInstance.find({ book: req.params.id })
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookView', {
      layout: 'layoutAdmin',
      title: 'Xem sách',
      book: results.bookDetail,
      bookIns: results.listBookInstance,
      csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
    })
    console.log('book: ' + results.bookDetail)
    console.log('bookInstance: ' + results.listBookInstance)
  })

}

// GET edit book (admin) page
exports.getEditPage = function (req, res, next) {
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
    res.render('management/bookEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa sách',
      book: results.bookDetail,
      csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
    })
    console.log('book: ' + results.bookDetail)
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
    console.log('listBookInstance: ' + results.listBookInstance)
  })
}

// POST add book
exports.postAdd = function (req, res, next) {
  var newBook = new Book({
    title: req.body.name,
    author: req.body.nameAuthor,
    publisher: req.body.namePublisher,
    publishDate: req.body.date,
    price: req.body.price,
    genre: req.body.gender,
    desciption: req.body.desciption
  })
  newBook.save(function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/book')
    }
  })
}

// POST edit book
exports.postEdit = function (req, res, next) {
  var editBook = new Book({
    _id: req.params.id,
    title: req.body.name,
    author: req.body.nameAuthor,
    publisher: req.body.namePublisher,
    publishDate: req.body.date,
    price: req.body.price,
    genre: req.body.gender,
    desciption: req.body.desciption
  })
  Book.findByIdAndUpdate(req.params.id, editBook, function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/book')
    }
  })
}

// POST delete author
exports.postDelete = function(req,res,next){
  Book.findByIdAndRemove(req.params.id, function(err){
    if(err) throw err;
    else
        res.redirect('/admin/book');
  })
}