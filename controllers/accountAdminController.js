const async = require('async')
const Account = require('../models/account')

// GET account homepage
exports.getHomepage = function (req, res, next) {
  async.parallel({
    listAccounts: (callback) => {
      Account.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('management/accountHomepage', {
      layout: 'layoutAdmin',
      title: 'Quản lý tài khoản',
      listAccounts: results.listAccounts
    })
    console.log('listAccount:' + results.listAccounts)
  })
}

// for developer
// GET view account (admin) page
exports.getViewPage = function (req, res, next) {
  async.parallel({
    accountDetail: (callback) => {
      Account.findById(req.params.id)
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
  // Successful, so render.
    res.render('management/accountView', {
      layout: 'layoutAdmin',
      title: 'Xem thông tin tài khoản',
      account: results.accountDetail
    })
    console.log('account: ' + results.accountDetail)
  })
}

// GET upgrade account (admin) page
exports.getUpgradePage = function (req, res, next) {
  // Successful, so render.
  res.render('management/accountUpgrade', {
    layout: 'layoutAdmin',
    title: 'Nâng cấp tài khoản'
  })
}

// GET delete account (admin) page
exports.getDeletePage = function (req, res, next) {
  // Successful, so render.
  res.render('management/accountDelete', {
    layout: 'layoutAdmin',
    title: 'Xóa tài khoản'
  })
}

// GET block account (admin) page
exports.getBlockPage = function (req, res, next) {
  // Successful, so render.
  res.render('management/accountBlock', {
    layout: 'layoutAdmin',
    title: 'Khóa tài khoản'
  })
}
