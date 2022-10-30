const router = require('express').Router();
const { Product, Cart, ProductCart } = require('../models');
const withAuth = require('../utils/auth');

//Route to get all product
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();

    const product = productData.map((product) => product.get({ plain: true }));
    res.render('home', {
      product,
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
