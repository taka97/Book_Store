// GET admin homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutAdmin',
    title: 'Hồ sơ cá nhân'
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutAdmin',
    title: 'Hồ sơ cá nhân'
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

// GET order page
exports.getOrderPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/order', {
    layout: 'layoutAdmin',
    title: 'Quản lý đơn hàng'
  })
}
