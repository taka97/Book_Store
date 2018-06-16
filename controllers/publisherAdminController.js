// GET publisher (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/publisherHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý nhà xuất bản'
  })
}
