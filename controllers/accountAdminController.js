// GET account homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('managenent/accountHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý tài khoản'
  })
}

// for developer
// GET view account (admin) page
exports.getViewPage = function (req, res, next) {
  // Successful, so render.
  res.render('managenent/accountView', {
    layout: 'layoutAdmin',
    title: 'Xem thông tin tài khoản'
  })
}

// GET upgrade account (admin) page
exports.getUpgradePage = function (req, res, next) {
  // Successful, so render.
  res.render('managenent/accountUpgrade', {
    layout: 'layoutAdmin',
    title: 'Nâng cấp tài khoản'
  })
}

// GET delete account (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('managenent/accountDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa tài khoản'
  })
}

// GET block account (admin) page
exports.getBlockPage = function (req, res, next) {
  // Successful, so render.
  res.render('managenent/accountBlock', {
    layout: 'layoutAdmin',
    title: 'Khóa tài khoản'
  })
}
