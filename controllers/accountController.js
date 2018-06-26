const async = require('async')
const Account = require('../models/book')

// Redirect to /book
exports.redirectToBook = function (req, res, next) {
  res.redirect('/account')
}

// Get list all book of author
exports.listAccount = function (req, res, next) {
  async.parallel({
    listAccounts: (callback) => {
      Account.find({})
        .exec(callback)
    },
  }, (err, results) => {
    if (err) { return next(err) }
    // Successful, so render.
    res.render('account', {
      layout: 'layoutHomepage',
      title: 'Book Store',
      listAccounts: results.listAccounts
    })

    console.log(results.listBooks)
  })
}
