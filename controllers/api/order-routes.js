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
    console.log(req.session.user_id);
    const orderData = await Order.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: { model: Product, through: ProductOrder },
    });

    const order = orderData.map((order) => order.get({ plain: true }));

    res.render('orders', order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const orderData = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Product, through: ProductOrder },
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
    let cart = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: { model: Product, through: ProductCart },
    });

    if (cart !== null) {
      let order = await Order.create({ user_id: req.session.user_id });

      for (const product of cart.products) {
        await ProductOrder.create({
          product_id: product.id,
          order_id: order.id,
        });
      }

      cart.destroy();
      res.redirect('/api/orders');
    } else {
      // We found no cart in user's name
      res.status(404).json({ message: 'User has no cart' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
