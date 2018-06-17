// GET book (admin) homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý sách'
  })
}

// for developer
// GET view book (admin) page
exports.getViewPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookView', {
    layout: 'layoutAdmin',
    title: 'Xem thông tin sách'
  })
}

// GET add book (admin) page
exports.getAddPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookAdd', {
    layout: 'layoutAdmin',
    title: 'Thêm sách'
  })
}

// GET edit book (admin) page
exports.getEditPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookEdit', {
    layout: 'layoutAdmin',
    title: 'Chỉnh sửa sách'
  })
}

// GET delete book (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('account/bookDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa sách'
  })
}
