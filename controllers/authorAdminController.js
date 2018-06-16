// GET author (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/authorHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý tác giả'
  })
}
