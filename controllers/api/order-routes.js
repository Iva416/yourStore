const router = require('express').Router();
const {
  Order,
  Cart,
  ProductOrder,
  ProductCart,
  Product,
} = require('../../models');
const auth = require('../../utils/auth');

// GET get all orders from the active user
router.get('/', auth, async (req, res) => {
  try {
    const orderData = await Order.findAll({
      where: { user_id: req.session.user_id },
    });

    const order = orderData.map((order) => order.get({ plain: true }));

    res.render('orders', order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const orderData = await Order.findOne({
      where: { id: req.params.id },
    });

    if (orderData.user_id === req.session.user_id) {
      const order = orderData.map((order) => order.get({ plain: true }));
      res.render('single-order', order);
    } else {
      res.statusCode(403);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Make current cart into order
router.post('/', auth, async (req, res) => {
  try {
    let cart = Cart.findOne({
      where: { user_id: req.session.user_id },
      include: { model: Product, through: ProductCart },
    });

    console.log(cart);

    if (cart !== null) {
      // let order = Order.create({ user_id: req.session.user_id });

      // for (const product of cart.Products) {

      // }

      res.redirect('/');
    } else {
      // We found no cart in user's name
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
