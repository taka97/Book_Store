var express = require('express')
var router = express.Router()

var cartController = require('../controllers/cartController')

/* Get CART page */
router.get('/', cartController.getCartPage)

router.get('/add-to-cart/:id', cartController.getAddToCart)

module.exports = router
