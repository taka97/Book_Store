const nodemailer = require('nodemailer')
const mailConfig = require('../config/mailer')

exports.sendVerifyEmail = function (to, linkVerify) {
  const transporter = nodemailer.createTransport({
    service: mailConfig.mailServer,
    auth: {
      user: mailConfig.username,
      pass: mailConfig.password
    }
  })

  const mailOptions = {
    from: mailConfig.email, // sender address
    to: to, // list of receivers
    subject: 'Xác nhận địa chỉ email của bạn', // Subject line
    html: 'Chào bạn,<br><br>Bạn đã đăng ký tài khoản với email ' +
      '<a href="mailto:' + to + '">' + to +
      '</a><br>Bạn vui lòng hoàn thành kích hoạt tài khoản bằng cách nhấn vào đường link bên dưới:<br>' +
      '<a href="' + linkVerify + '">' + linkVerify +
      '</a><br><br>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.'
  }
  console.log(mailOptions.to)
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) } else { console.log(info) }
  })
}
