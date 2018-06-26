const async = require('async')
const Author = require('../models/author')
const Book = require('../models/book')

// GET author (admin) homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listAuthors: (callback) => {
      Author.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/authorHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý tác giả',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      listAuthors: results.listAuthors
    })
    console.log('listAuthors:' + results.listAuthors)
  })
}

// for developer
// GET add author (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/authorAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm tác giả',
    csrfToken: req.csrfToken() // send token to client, it is neccessary when send post request
  })
}

// GET edit author (admin) page
exports.getEditPage = function (req, res, next) {
  async.parallel({
    authorDetail: (callback) => {
      Author.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    // console.log(results.authorDetail)
    res.render('management/authorEdit', {
      layout: 'layoutAdmin',
      title: 'Chỉnh sửa tác giả',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      author: results.authorDetail
    })
    console.log('author: ' + req.csrfToken())
  })
}

// GET delete author (admin) page
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
      author: results.authorDetail,
      listBooksAuthor: results.listBooksAuthor,
      hasBook: results.listBooksAuthor.length
    })
  })
}

// POST add author
exports.postAdd = function (req, res, next) {
  var newAuthor = new Author({
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender === 'male' ? 'Nam' : 'Nữ',
    nationality: req.body.national
  })
  newAuthor.save(function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/author/add')
    }
  })
}

// POST edit author
exports.postEdit = function (req, res, next) {
  var editAuthor = new Author({
    _id: req.params.id,
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender,
    nationality: req.body.national
  })
  Author.findByIdAndUpdate(req.params.id, editAuthor, function (err) {
    if (err) throw err
    else {
      res.redirect('/admin/author')
    }
  })
}

// POST delete author
exports.postDelete = function(req,res,next){
  Author.findByIdAndRemove(req.params.id, function(err){
    if(err) throw err;
    else
        res.redirect('/admin/author');
  })
}
