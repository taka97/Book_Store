const Cart = require('../models/cart')
const Book = require('../models/book')

/* GET cart page */
exports.getCartPage = function (req, res, next) {
  res.render('cartPage', {
    layout: 'layoutHomepage',
    title: 'Giỏ hàng'
  })
}

/* GET add-to-cart page */
exports.getAddToCart = function (req, res, next) {
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})

  Book.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
    console.log(req.session.cart)
    res.redirect('/')
  })
}
