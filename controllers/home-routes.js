const router = require('express').Router();
const { Product } = require('../models');

//Route to get all product
router.get('/', async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });

  const product = productData.map((product) => product.get({ plain: true }));
  res.render('home', { product });
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
