// GET publisher (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/publisherHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý nhà xuất bản'
  })
}

// for develop
// GET add publisher (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/publisherAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách'
  })
}

// GET edit publisher (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/publisherEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa sách'
  })
}

// GET delete publisher (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/publisherDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa sách'
  })
}
