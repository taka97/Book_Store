const passport = require('passport')
const Account = require('../models/account')
const LocalStratery = require('passport-local').Stratery

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
  passwordField: `password`,
  passReqToCallback: true
}, function (req, email, password, done) {
  Account.findOne({ 'email': email })
    .exec(function (err, account) {
      if (err) {
        return done(err)
      }
      if (account) {
        return done(null, false, { message: 'Email đang được sử dụng trong 1 tài khoản khác' })
      }
      var newAccount = new Account()
      newAccount.email = email
      newAccount.password = newAccount.encryptPassword(password)
      newAccount.save(function (err, result) {
        if (err) { return done(err) }
        return done(null, account)
      })
    })
}))
