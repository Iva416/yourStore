const router = require('express').Router();
const { Product, Cart, ProductCart } = require('../models');
const withAuth = require('../utils/auth');

//Route to get all product
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    const cartData = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart }],
    });
    let NumInCart = cartData.product_carts.length;
    const product = productData.map((product) => product.get({ plain: true }));
    res.render('home', {
      product,
      NumInCart,
      logged_in: req.session.logged_in,
      username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products from user shopping cart
router.get('/cart', withAuth, async (req, res) => {
  try {
    const rawProduct = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart, include: Product }],
    });
    const product = rawProduct.get({ plain: true });
    let NumInCart = rawProduct.product_carts.length;

    res.render('cart', {
      ...product,
      NumInCart,
      logged_in: req.session.logged_in,
      username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
