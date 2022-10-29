const router = require('express').Router();
const { Product, Cart, ProductCart } = require('../models');
const withAuth = require('../utils/auth');

//Route to get all product
router.get('/', async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });

  const product = productData.map((product) => product.get({ plain: true }));
  res.render('home', {
    product,
    logged_in: req.session.logged_in,
    username: req.session.name,
  });
});

//get all products from user shopping cart
router.get('/cart', withAuth, async (req, res) => {
  const rawProduct = await Cart.findOne({
    where: { user_id: req.session.user_id },
    include: [{ model: ProductCart, include: Product }],
  });
  const product = rawProduct.get({ plain: true });

  res.render('cart', {
    ...product,
    logged_in: req.session.logged_in,
    username: req.session.name,
  });
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
