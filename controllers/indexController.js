const async = require('async')
const Genre = require('../models/genre')

/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find({})
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    var GenreChucks = []
    var chunkSize = 3
    for (var i = 0; i <= results.listGenres.length; i += chunkSize) {
      GenreChucks.push(results.listGenres.slice(i, i + chunkSize))
    }
    // Successful, so render.
    res.render('homepage', {
      layout: 'layoutHomepage',
      title: 'Nhà sách - Trang chủ',
      GenreChucks: GenreChucks,
      listGenres: results.listGenres
    })
    console.log(GenreChucks)
    console.log(results.listGenres)
  })
}

exports.getDigitalWallets = function (req, res, next) {
  res.render('digitalwallets', {
    layout: false
  })
}

exports.searchBook = function (req, res, next) {
  res.render('search', {
    layout: 'layoutHomepage',
    title: 'Tìm kiếm sách'
  })
}
