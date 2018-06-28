const createError = require('http-errors')

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  next(createError(404))
}

exports.notLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  return next(createError(404))
}

exports.isLoginAndAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.typeAccount === 'Admin') {
    return next()
  }
  next(createError(404))
}

exports.isLoginAndUser = function (req, res, next) {
  if (req.isAuthenticated() && req.user.typeAccount === 'User') {
    return next()
  }
  next(createError(404))
}
