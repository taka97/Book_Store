const async = require('async')
const Genre = require('../models/genre')
const Cart = require('../models/cart')
const BookInstance = require('../models/bookInstance')

/* GET cart page */
exports.getCartPage = function (req, res, next) {
  async.parallel({
    listGenres: (callback) => {
      Genre.find()
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    var GenreChucks = []
    var chunkSize = 3
    for (var i = 0; i <= results.listGenres.length; i += chunkSize) {
      GenreChucks.push(results.listGenres.slice(i, i + chunkSize))
    }
    var cartDetail = new Cart(req.session.cart ? req.session.cart : {})
    // success so render
    res.render('cartPage', {
      layout: 'layoutHomepage',
      title: 'Giỏ hàng',
      csrfToken: req.csrfToken(),
      GenreChucks: GenreChucks,
      cartDetail: cartDetail.generateArray()
    })
    console.log(cartDetail.generateArray())
  })
}

/* GET add-to-cart page */
exports.postAddToCart = function (req, res, next) {
  var productId = req.body.product_id
  var cart = new Cart(req.session.cart ? req.session.cart : {})

  BookInstance.findById(productId)
    .exec((err, product) => {
      if (err) {
        return res.redirect('/')
      }
      cart.add(product, product.id)
      req.session.cart = cart

      res.redirect('/book')
      console.log(req.session.cart)
    })
}
