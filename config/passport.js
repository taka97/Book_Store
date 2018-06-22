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
  Account.findOne({ email: email })
    .exec(function (err, account) {
      if (err) {
        console.log('findOne. Error: ' + err)
        return done(err)
      }
      if (account) {
        console.log('Email is duplicate: ' + account)
        return done(null, false, { message: 'Email đang được sử dụng trong 1 tài khoản khác' })
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
