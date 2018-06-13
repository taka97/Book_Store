// GET admin homepage

exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/adminHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản trị viên'
  })
}
