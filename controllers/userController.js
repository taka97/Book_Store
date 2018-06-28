const Account = require('../models/account')

// GET user homepage
exports.getHomepage = function (req, res, next) {
  res.render('account/viewProfile', {
    layout: 'layoutUser',
    title: 'Người dùng',
    user: req.user
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutUser',
    title: 'Hồ sơ cá nhân',
    user: req.user
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/changeProfile', {
    layout: 'layoutUser',
    title: 'Thay đổi hồ sơ cá nhân',
    csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
    user: req.user
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

// POST change account
exports.postChangeProfile = function (req, res, next) {
  var newData = {
    email: req.body.email,
    avatarPath: req.body.avatarPath,
    name: req.body.name,
    gender: req.body.gender === 'male' ? 'Nam' : 'Nữ',
    address: req.body.address
  }
  Account.findByIdAndUpdate(req.user.id, newData, { new: true }, (err, newUser) => {
    if (err) { return next(err) }
    req.user = newUser
    res.redirect('/user/profile')
    console.log(newUser)
  })
}
