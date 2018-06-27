const express = require('express')
const router = express.Router()

var cartController = require('../controllers/cartController')

/* Get CART page */
router.get('/', cartController.getCartPage)

router.get('/checkout', cartController.getCheckoutPage)

router.post('/add-to-cart', cartController.postAddToCart)

router.post('/checkout', cartController.postCheckout)

module.exports = router
