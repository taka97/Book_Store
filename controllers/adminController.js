// GET admin homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/adminHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản trị viên'
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/changeProfile', {
    layout: 'layoutAdmin',
    title: 'Thay đổi hồ sơ cá nhân'
  })
}
