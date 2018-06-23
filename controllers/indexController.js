/* GET homepage. */
exports.getHomepage = function (req, res, next) {
  res.render('homepage', { title: 'Nhà sách - Trang chủ', layout: 'layoutHomepage' })
}

/* GET cart page */
exports.getCart = function (req, res, next) {
  res.render('cartPage', { title: 'Giỏ hàng', layout: 'layoutHomepage' })
}

/* GET genre page */
exports.getGenre = function (req, res, next) {
  res.render('genrePage', { title: 'Thể loại sách', layout: 'layoutHomepage' })
}

/* GET book detail page */
exports.getBookDetail = function (req, res, next) {
  res.render('bookDetailPage', {
    layout: 'layoutHomepage',
    title: 'Chi tiết sách'
  })
}
