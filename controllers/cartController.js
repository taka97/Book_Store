const Cart = require('../models/cart')
const BookInstance = require('../models/bookInstance')

/* GET cart page */
exports.getCartPage = function (req, res, next) {
  res.render('cartPage', {
    layout: 'layoutHomepage',
    title: 'Giỏ hàng'
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
