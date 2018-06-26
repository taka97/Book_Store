const express = require('express')
const router = express.Router()

var cartController = require('../controllers/cartController')

/* Get CART page */
router.get('/', cartController.getCartPage)

router.post('/add-to-cart', cartController.postAddToCart)

module.exports = router
