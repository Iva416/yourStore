const router = require('express').Router();
const { Product, Cart, ProductCart } = require('../models');
const withAuth = require('../utils/auth');

//Route to get all product
router.get('/', async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });

  const product = productData.map((product) => product.get({ plain: true }));
  res.render('home', { product });
});

router.get('/cart', async (req, res) => {
  const rawProduct = await Cart.findOne({
    where: { id: 1 },
    include: [{ model: Product, through: ProductCart }],
  });
  const product = rawProduct.get({ plain: true });
  // res.json(product);
  res.render('cart', { ...product });
});
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
