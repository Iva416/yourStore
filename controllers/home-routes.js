const router = require('express').Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = reqiure('../models/User');

//Route to get all product
router.get('/', async (req, res) => {
    const productData = await Product.findAll().catch((err) => {
        res.json(err);
    });
    const product = productData.map((product) => product.get({ plain: true }));
    res.render('home', { product });
});


module.exports = router;