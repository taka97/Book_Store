// GET user homepage

exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('user/index', {
    layout: 'layoutUser',
    title: 'Người dùng'
  })
}
