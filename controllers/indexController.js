/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  res.render('homepage', {
    title: 'Nhà sách - Trang chủ'
  })
}

exports.getDigitalWallets = function (req, res, next) {
  res.render('digitalwallets', {
    layout: false
  })
}
