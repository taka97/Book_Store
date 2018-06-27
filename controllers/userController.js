const async = require('async')
const Account = require('../models/account')

// GET user homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listAccounts: (callback) => {
      Account.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/userHomepage', {
      layout: 'layoutUser',
      title: 'Người dùng',
      listAccounts: results.listAccounts
    })
    // console.log('listAccount:' + results.listAccounts)
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  async.parallel({
    accountDetail: (callback) => {
      Account.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/viewProfile', {
      layout: 'layoutUser',
      title: 'Hồ sơ cá nhân',
      user: req.user,
      account: results.accountDetail
    })
    // console.log(req.user)
    // console.log('account: ' + results.accountDetail)
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  async.parallel({
    accountDetail: (callback) => {
      Account.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account/changeProfile', {
      layout: 'layoutUser',
      title: 'Thay đổi hồ sơ cá nhân',
      csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
      user: req.user,
      account: results.accountDetail
    })
    // console.log('account: ' + results.accountDetail)
  })
}

// GET order page
exports.getOrderPage = function (req, res, next) {
  // Successful, so render.
  res.render('account/order', {
    layout: 'layoutUser',
    title: 'Quản lý đơn hàng'
  })
}

/* Get logout request */
exports.logout = function (req, res, next) {
  // Successful, so render.
  res.redirect('/login')
}

// POST change account
exports.postChangeProfile = function (req, res, next) {
  var editAccount = new Account({
    _id: req.params.id,
    email: req.body.email,
    verifyEmail: req.params.verifyEmail,
    password: req.params.password,
    avatarPath: req.params.avatarPath,
    name: req.body.name,
    birthDate: req.body.date,
    gender: req.body.gender,
    address: req.body.address,
    typeAccount: req.params.typeAccount,
    isBlock: req.params.isBlock
  })
  Account.findByIdAndUpdate(req.params.id, editAccount, function (err) {
    if (err) throw err
    else {
      res.redirect('/user/profile')
    }
  })
}
