// GET account homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/accountHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý tài khoản'
  })
}
