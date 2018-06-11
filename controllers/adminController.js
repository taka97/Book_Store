// GET admin homepage

exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('admin/index', {
    layout: 'layoutAdmin',
    title: 'Quản trị viên'
  })
}
