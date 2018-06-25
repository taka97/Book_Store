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
    // Successful, so render.
    res.render('homepage', {
      layout: 'layoutHomepage',
      title: 'Nhà sách - Trang chủ'
    })
    console.log(results.listGenres)
  })
}

exports.getDigitalWallets = function (req, res, next) {
  res.render('digitalwallets', {
    layout: false
  })
}
