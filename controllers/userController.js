const properties = require('properties-reader')('./config/properties.file')
const Account = require('../models/account')

// GET user homepage
exports.getHomepage = function (req, res, next) {
  res.render('account/viewProfile', {
    layout: properties.get('layout.userLayout'),
    title: properties.get('title.user.homepage')
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: properties.get('layout.userLayout'),
    title: properties.get('title.user.profile.view')
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  // Successful, so render.
  var messageValidate = req.flash('errorValidate')
  var messageErrorConfig = req.flash('errorConfig')

  res.render('account/changeProfile', {
    layout: properties.get('layout.userLayout'),
    title: properties.get('title.user.profile.edit'),
    csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
    messageValidate: messageValidate,
    hasErrorMessage: messageValidate.length > 0,
    messageErrorConfig: messageErrorConfig,
    hasMessageConfig: messageErrorConfig.length > 0
  })
}

// GET order page
exports.getOrderPage = function (req, res, next) { /* Still developer */
  // Successful, so render.
  res.render('account/order', {
    layout: properties.get('layout.userLayout'),
    title: 'Quản lý đơn hàng'
  })
}

// POST change account
exports.postChangeProfile = function (req, res, next) {
  req.checkBody('email')
    .notEmpty()
    .isEmail().withMessage('Email không hợp lệ')
  req.checkBody('name')
    .notEmpty()
    .trim().withMessage('Vui lòng nhập tên người dùng')
  req.checkBody('birthDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Ngày sinh không hợp lệ')
  req.checkBody('address')
    .notEmpty()
    .trim().withMessage('Vui lòng nhập địa chỉ')

  var errors = req.validationErrors()
  if (errors) {
    var messages = []
    errors.forEach(error => {
      console.log('Error message: ' + error.msg)
      messages.push(error.msg)
    })
    req.flash('errorValidate', messages)
    return res.redirect('/user/change-profile')
  }

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

// POST change password
exports.postChangePassword = function (req, res, next) {
  req.checkBody('oldPassword')
    .notEmpty()
    .withMessage('Mật khẩu cũ không hợp lệ')
  req.checkBody('confPassword')
    .notEmpty()
    .custom(value => value === req.body.newPassword).withMessage('Mật khẩu xác nhập không hợp lệ')

  // Store error message
  var errors = req.validationErrors()
  if (errors) {
    var messages = []
    errors.forEach(error => {
      messages.push(error.msg)
    })
    req.flash('errorConfig', messages)
    return res.redirect('/user/change-profile')
  }

  var newData = {
    password: req.user.encryptPassword(req.body.newPassword)
  }
  Account.findByIdAndUpdate(req.user.id, newData, { new: true }, (err, newUser) => {
    if (err) { return next(err) }
    req.user = newUser
    res.redirect('/user/profile')
    // console.log(newUser)
  })
}
