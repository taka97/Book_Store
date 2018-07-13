exports.getHomepage = function (req, res, next) {
  res.render('management/orderHomepage', {
    layout: 'layoutAdmin',
    title: 'Quản lý các đơn hàng',
    csrfToken: req.csrfToken()
  })
}
