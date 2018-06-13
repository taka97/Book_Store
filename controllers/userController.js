// GET user homepage

exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/userHomepage', {
    layout: 'layoutUser',
    title: 'Người dùng'
  })
}
