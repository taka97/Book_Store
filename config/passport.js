const passport = require('passport')
const Account = require('../models/account')
var LocalStratery = require('passport-local').Strategy

passport.serializeUser(function (account, done) {
  done(null, account.id)
})

passport.deserializeUser(function (id, done) {
  Account.findById(id)
    .exec(function (err, account) {
      done(err, account)
    })
})

passport.use('signup', new LocalStratery({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  // Validate fields.
  req.checkBody('email')
    .notEmpty()
    .isEmail().withMessage('Email không hợp lệ')
    .trim()
    .normalizeEmail()
  req.checkBody('password')
    .notEmpty()
    .withMessage('Mật khẩu không hợp lệ')
  req.checkBody('repassword')
    .notEmpty()
    .custom(value => value === req.body.password).withMessage('Mật khẩu xác nhập không hợp lệ')
  req.checkBody('name')
    .notEmpty()
    .trim()
    .isAlphanumeric().withMessage('Tên chỉ có thể chứa các ký tự chữ cái')
  req.checkBody('birthDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Ngày sinh không hợp lệ')

  // Sanitize fields.
  // req.sanitizeBody('email').trim().excape()
  // req.sanitizeBody('password').trim().excape()

  // Store error message
  var errors = req.validationErrors()
  if (errors) {
    var messages = []
    errors.forEach(error => {
      console.log('Error message: ' + error.msg)
      messages.push(error.msg)
    })
    return done(null, false, req.flash('error', messages))
  }
  // Process request after validation and sanitization.
  Account.findOne({ email: email })
    .exec(function (err, account) {
      if (err) {
        return done(err)
      }
      if (account) {
        return done(null, false, { message: 'Email đang được sử dụng cho 1 tài khoản khác' })
      }

      var newAccount = new Account()
      newAccount.email = email
      newAccount.password = newAccount.encryptPassword(password)
      newAccount.name = req.body.name
      newAccount.birthDate = req.body.birthDate
      newAccount.gender = req.body.gender === 'male' ? 'Nam' : 'Nữ'
      newAccount.address = req.body.address
      newAccount.avatarPath = '/images/user.png'
      newAccount.typeAccount = 'User'
      newAccount.verifyEmail = false

      newAccount.save(function (err) {
        if (err) { return done(err) }
        return done(null, newAccount)
      })
    })
}))
