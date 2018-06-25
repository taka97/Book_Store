// GET bookInstance (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý sách'
  })
}

// for developer
// GET view bookInstance (admin) page
exports.getViewPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceView', {
    layout: 'layoutAdmin',
    title: 'Xem thông tin sách'
  })
}

// GET add bookInstance (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách'
  })
}

// GET edit bookInstance (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa sách'
  })
}

// GET delete bookInstance (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookInstanceDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa sách'
  })
}
