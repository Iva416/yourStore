const router = require('express').Router();
const { Product } = require('../../models');

// GET get all products from database
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();

    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;


