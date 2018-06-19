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

