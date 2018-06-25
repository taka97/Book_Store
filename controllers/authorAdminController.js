const async = require('async')
const Author = require('../models/author')

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
    res.render('account/authorHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý tác giả',
      listAuthors: results.listAuthors
    })
    console.log('listAuthor:' + results.listAuthors)
  })
}

// for developer
// GET view author (admin) page
exports.getViewPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorView', {
    layout: 'layoutAdmin',
    title: 'Xem thông tin tác giả'
  })
}

// GET add author (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm tác giả'
  })
}

// GET edit author (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa tác giả'
  })
}

// GET delete author (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa tác giả'
  })
}
