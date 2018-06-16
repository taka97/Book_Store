// GET user homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/userHomepage', {
    layout: 'layoutUser',
    title: 'Người dùng'
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutUser',
    title: 'Hồ sơ cá nhân'
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/changeProfile', {
    layout: 'layoutUser',
    title: 'Thay đổi hồ sơ cá nhân'
  })
}

// GET order page
exports.getOrderPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/order', {
    layout: 'layoutUser',
    title: 'Quản lý đơn hàng'
  })
}

/* Get logout request */
exports.logout = function (req, res, next) {
  // Successful, so render.
  res.redirect('/login')
}
