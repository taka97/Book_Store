const async = require('async')
const Genre = require('../models/genre')
const Cart = require('../models/cart')
const BookInstance = require('../models/bookInstance')
const Book = require('../models/book')

/* GET cart page */
exports.getCartPage = function (req, res, next) {
  if (!req.session.cart) {
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
      // success so render
      res.render('cartPage', {
        layout: 'layoutHomepage',
        title: 'Giỏ hàng',
        csrfToken: req.csrfToken(),
        GenreChucks: GenreChucks,
        cartDetail: null
      })
      // console.log(cartDetail.generateArray())
    })
  } else {
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
      var cartDetail = new Cart(req.session.cart)
      // success so render
      res.render('cartPage', {
        layout: 'layoutHomepage',
        title: 'Giỏ hàng',
        csrfToken: req.csrfToken(),
        GenreChucks: GenreChucks,
        cartDetail: cartDetail.generateArray()
      })
      // console.log(cartDetail.generateArray())
    })
  }
}

exports.getCartChange = function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/book')
  }

  var quantity = parseInt(req.query.quantity, 10)
  var productId = req.query.productId
  console.log(productId)

  var cart = new Cart(req.session.cart)
  async.parallel({
    one: function (callback) {
      BookInstance.findById(productId)
        .populate('book')
        .exec((err, product) => {
          if (err) { return next(err) }
          callback(null, product)
          // cart.add(product, product.id)
          // req.session.cart = cart
        })
    },
    two: function (callback) {
      var promise = new Promise((resolve, reject) => {
        BookInstance.findById(productId)
          .exec((err, product) => {
            if (err) {
              return res.redirect('/')
            }
            resolve(product)
          })
      })
      promise.then(product => {
        Book.findById(product.book._id)
          .populate('author genre publisher')
          .exec((err, book) => {
            if (err) { return next(err) }
            callback(null, book)
          })
      })
    }
  }, (err, results) => {
    if (err) { return next(err) }
    if (quantity === 0) {
      cart.remove(results, results.one.id)
    } else {
      cart.update(results, results.one.id, quantity)
    }

    req.session.cart = cart
    console.log(cart)
    res.redirect('/cart')
  })
}

exports.getCheckoutPage = function (req, res, next) {
  if (!req.session.cart) {
    res.redirect('/cart')
  } else {
    var cart = new Cart(req.session.cart)
    res.render('checkout', {
      layout: 'layoutCheckout',
      cartDetail: cart.generateArray()
    })
  }
}

/* POST add-to-cart page */
exports.postAddToCart = function (req, res, next) {
  var productId = req.body.product_id
  var quantity = req.body.quantity || 1
  var cart = new Cart(req.session.cart || {})
  async.parallel({
    one: function (callback) {
      BookInstance.findById(productId)
        .populate('book')
        .exec((err, product) => {
          if (err) { return next(err) }
          callback(null, product)
          // cart.add(product, product.id)
          // req.session.cart = cart
        })
    },
    two: function (callback) {
      var promise = new Promise((resolve, reject) => {
        BookInstance.findById(productId)
          .exec((err, product) => {
            if (err) {
              return res.redirect('/')
            }
            resolve(product)
          })
      })
      promise.then(product => {
        Book.findById(product.book._id)
          .populate('author genre publisher')
          .exec((err, book) => {
            if (err) { return next(err) }
            callback(null, book)
          })
      })
    }
  }, (err, results) => {
    if (err) { return next(err) }
    for (let i = 0; i < quantity; i++) {
      cart.add(results, results.one.id)
    }
    req.session.cart = cart
    console.log(cart)
    res.redirect('/book')
  })
}

/* POST checkout */
exports.postCheckout = function (req, res, next) {
  res.status(200)
  res.send('post checkout')
}
