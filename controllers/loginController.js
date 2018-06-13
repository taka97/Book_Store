// GET Login page
exports.login = function (req, res, next) {
  res.render('login/login', {
    layout: 'layoutLogin',
    title: 'Đăng nhập hoặc Đăng ký tài khoản'
  })
}
