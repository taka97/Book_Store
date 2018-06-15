// GET book (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý sách'
  })
}
