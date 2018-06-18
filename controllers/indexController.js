/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  res.render('homepage', { title: 'Nhà sách - Trang chủ', layout: 'layoutHomepage' })
}

/* GET cart page */
exports.getCart = function (req, res, next) {
  res.render('cart', {title: 'Giỏ hàng', layout: 'layoutHomepage'})
}

/* GET genre page */
exports.getGenre = function (req, res, next) {
  res.render('genre', {title: 'Thể loại sách', layout: 'layoutHomepage'})
}
