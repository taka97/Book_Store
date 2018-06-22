const passport = require(`passport`)

// GET Login page
exports.getLoginPage = function (req, res, next) {
  var messages = req.flash('error')
  res.render('login/login', {
    layout: 'layoutLogin',
    title: 'Đăng nhập',
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
}

// GET Register page
exports.getSignuppage = function (req, res, next) {
  var messages = req.flash('error')
  res.render('login/register', {
    layout: 'layoutLogin',
    title: 'Đăng ký tài khoản',
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
}

// POST signup
exports.postSignup = passport.authenticate('signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/login/register',
  failureFlash: true
})

// POST signin
exports.postSignin = function (req, res, next) {

}
