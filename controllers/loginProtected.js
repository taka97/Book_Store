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
