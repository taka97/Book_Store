const passport = require(`passport`)

// GET Login page
exports.getLoginPage = function (req, res, next) {
  res.render('login/login', {
    layout: 'layoutLogin',
    title: 'Đăng nhập hoặc Đăng ký tài khoản',
    csrfToken: req.csrfToken()
  })
}

// POST signup
exports.postSignup = passport.authenticate('signup', {
  successRedirect: '/user/profile',
  // successRedirect: '/login',
  failureRedirect: '/login',
  failureFlash: true
})

// POST signin
exports.postSignin = function (req, res, next) {

}
