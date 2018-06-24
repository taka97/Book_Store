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
exports.getRegisterPage = function (req, res, next) {
  var messages = req.flash('error')
  res.render('login/register', {
    layout: 'layoutLogin',
    title: 'Đăng ký tài khoản',
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
}

exports.getLogoutRequest = function (req, res, next) {
  req.logout()
  res.redirect('/')
}

// Handle POST register
exports.postRegister = passport.authenticate('signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/register',
  failureFlash: true
})

// Handle POST login
exports.postLogin = passport.authenticate('signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/login',
  failureFlash: true
})
