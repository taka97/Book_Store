// GET genre (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/genreHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý thể loại'
  })
}
