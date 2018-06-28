const Account = require('../models/account')

// GET admin homepage
exports.getHomepage = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutAdmin',
    title: 'Hồ sơ cá nhân',
    user: req.user
  })
}

// GET view profile page
exports.getViewProfile = function (req, res, next) {
  // Successful, so render.
  res.render('account/viewProfile', {
    layout: 'layoutAdmin',
    title: 'Hồ sơ cá nhân',
    user: req.user
  })
}

// GET change profile page
exports.getChangeProfile = function (req, res, next) {
  // Successful, so render.
  var messageValidate = req.flash('errorValidate')
  res.render('account/changeProfile', {
    layout: 'layoutUser',
    title: 'Thay đổi hồ sơ cá nhân',
    csrfToken: req.csrfToken(), // send token to client, it is neccessary when send post request
    user: req.user,
    messagePassword: req.flash('errorConfig'),
    messageValidate: messageValidate,
    hasErrorMessage: messageValidate.length > 0
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
    return res.redirect('/admin/change-profile')
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
    res.redirect('/admin/profile')
    console.log(newUser)
  })
}

// POST change password
exports.postChangePassword = function (req, res, next) {
  if (!req.user.validPassword(req.body.oldPassword)) {
    req.flash('errorConfig', 'Mật khẩu không trùng khớp')
    return res.redirect('/admin/change-profile')
  }

  if (req.body.newPassword !== req.body.confPassword) {
    req.flash('errorConfig', 'Mật khẩu không trùng khớp')
    return res.redirect('/admin/change-profile')
  }

  var newData = {
    password: req.user.encryptPassword(req.body.newPassword)
  }
  Account.findByIdAndUpdate(req.user.id, newData, { new: true }, (err, newUser) => {
    if (err) { return next(err) }
    req.user = newUser
    res.redirect('/admin/profile')
  })
}
