const properties = require('properties-reader')('./config/properties.file')
const passport = require(`passport`)

// GET Login page
exports.getLoginPage = function (req, res, next) {
  var messages = req.flash('error')
  res.render('login/login', {
    layout: properties.get('layout.loginLayout'),
    title: properties.get('title.login'),
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
}

// GET Register page
exports.getRegisterPage = function (req, res, next) {
  var messages = req.flash('error')
  res.render('login/register', {
    layout: properties.get('layout.loginLayout'),
    title: properties.get('title.register'),
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
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
})

// Handle POST login
exports.postLogin = passport.authenticate('signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
