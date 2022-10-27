const router = require('express').Router();

const loginroutes = require('./login-routes');
const cartroutes = require('./cart-routes');
const orderroutes = require('./order-routes');
const productroutes = require('./product-routes');

router.use('/login', loginroutes);
router.use('/cart', cartroutes);
router.use('/orders', orderroutes);
router.get('/products', productroutes);

module.exports = router;
