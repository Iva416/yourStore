const router = require('express').Router();
const { Product, Cart, ProductCart } = require('../models');
const withAuth = require('../utils/auth');

//Route to get all product
router.get('/', async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });

  const products = productData.map((product) => product.get({ plain: true }));
  console.log('---------------------------------------');
  console.log(products);
  console.log('---------------------------------------');
  res.render('home', { product: products, logged_in: req.session.logged_in });
});

router.get('/cart', withAuth, async (req, res) => {
  const rawProduct = await Cart.findOne({
    where: { id: req.session.user_id },
    include: [{ model: Product, through: ProductCart }],
  });
  const product = rawProduct.get({ plain: true });
  // res.json(product);
  res.render('cart', { ...product, logged_in: req.session.logged_in });
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
