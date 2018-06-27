const async = require('async')
const Genre = require('../models/genre')
const Cart = require('../models/cart')
const BookInstance = require('../models/bookInstance')
const Book = require('../models/book');

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
  async.parallel({
    one: function(callback){
      BookInstance.findById(productId)
      .populate('book')
      .exec((err, product) => {
        if (err) {
          return res.redirect('/')
        }
        callback(null, product);
        //cart.add(product, product.id)
        //req.session.cart = cart
      })
    },
    two: function(callback){
       var promise = new Promise((resolve, reject) => {
        BookInstance.findById(productId)
        .exec((err, product) => {
          if (err) {
            return res.redirect('/')
          }
          resolve(product);
        })
       })
       promise.then(product => {
         Book.findById(product.book._id).populate('author').populate('genre').populate('publisher').exec((err, book)=>{
             if(err) throw err;
             callback(null, book);
         })
       })
    }
  },
  function(err, results){
    if(err) throw err;
    cart.add(results, results.one.id)
    req.session.cart = cart
    console.log(cart);
    res.redirect('/');
  }
)
  
}
