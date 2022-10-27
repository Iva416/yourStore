const router = require('express').Router();
const { Product } = reqyure('../models');

//Route to get all product
router.get('/', async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });
  const product = productData.map((product) => product.get({ plain: true }));
  res.render('home', { product });
});

module.exports = router;
