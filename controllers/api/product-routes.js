const router = require('express').Router();
const { Product } = require('../../models');

// GET get all products from database
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    const product = productData.map((product) => product.get({ plain: true }));

    res.render('home', product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({ where: { id: req.params.id } });
    const product = productData.map((product) => product.get({ plain: true }));

    res.render('product', product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
