const async = require('async')
const Genre = require('../models/genre')

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
    res.render('account/genreHomepage', {
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
  res.render('account/genreAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm thể loại'
  })
}

// GET edit genre (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/genreEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa thể loại'
  })
}

// GET delete genre (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/genreDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa thể loại'
  })
}
