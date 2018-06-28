const async = require('async')
const BookInstance = require('../models/bookInstance')
const Book = require('../models/book')

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
  async.parallel({
    // bookDetail: (callback) => {
    //   Book.findById(req.params.id)
    //     .exec(callback)
    // }
    listBook: (callback) => {
      Book.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/bookInstanceAdd', {
      layout: 'layoutAdmin',
      title: 'Thêm sản phẩm',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      books: results.listBook
    })
    console.log('Books: ' + results.listBook)
  })
}

// GET edit bookInstance (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    listBook: (callback) => {
      Book.find()
        .exec(callback)
    },
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
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      books: results.listBook,
      bookinstance: results.bookinstanceDetail
    })
    // console.log('bookinstance: ' + results.bookinstanceDetail)
    console.log('Books: ' + results.listBook)
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
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      bookinstance: results.bookinstanceDetail
    })
    console.log('bookinstance: ' + results.bookinstanceDetail)
  })
}

// POST add bookInstance
exports.postAdd = function (req, res, next) {
  var newBookInstance = new BookInstance({
    book: req.body.name,
    currentPrice: req.body.price,
    currentTotalQuantity: req.body.total,
    size: req.body.size,
    coverType: req.body.coverType,
    imageCover: 'https://media.ohay.tv/v1/content/2014/11/minion-ohay-tv-492.jpeg',
    status: req.body.status
  })
  newBookInstance.save(function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/bookinstance')
    }
  })
}

// POST edit bookInstance
exports.postEdit = function (req, res, next) {
  var editBookInstance = new BookInstance({
    _id: req.params.id,
    book: req.body.name,
    currentPrice: req.body.price,
    currentTotalQuantity: req.body.total,
    size: req.body.size,
    coverType: req.body.coverType,
    imageCover: 'https://media.ohay.tv/v1/content/2014/11/minion-ohay-tv-492.jpeg',
    status: req.body.status
  })
  BookInstance.findByIdAndUpdate(req.params.id, editBookInstance, function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/bookinstance')
    }
  })
}

// POST delete bookInstance
exports.postDelete = function (req, res, next) {
  BookInstance.findByIdAndRemove(req.params.id, function (err) {
    if (err) throw err;
    else
      res.redirect('/admin/bookinstance');
  })
}


// POST search bookInstance
exports.searchBookInstance = function (req, res, next) {
  console.log('da vao')
  var bookInsChuck = [];
  BookInstance.find({ $text: { $search: req.body.keyword } })
  .populate('book')
  .exec(function (err, docs) {
    if (err) throw err;
    bookInsChuck.push(docs.slice(0, docs.length));
    // console.log(docs);
    res.render('search', { 
      title: 'Group-BookIns', 
      layout: 'layoutUser',
      // csrfToken: req.csrfToken(),
      listBooks: bookInsChuck, 
      name: req.body.q
    });
    console.log(' booookkkkk searchbookInstance')
  })
}