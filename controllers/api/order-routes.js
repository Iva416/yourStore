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
      where: {
        user_id: req.session.user_id,
      },
      include: { model: ProductOrder, include: Product },
    });

    const orders = orderData.map((order) => order.get({ plain: true }));
    res.render('orders', {
      orders: orders,
      logged_in: req.session.logged_in,
      username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single order
// Display all products in the order
router.get('/:id', auth, async (req, res) => {
  try {
    const orderData = await Order.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: { model: ProductOrder, include: Product },
    });

    if (orderData !== null) {
      const order = orderData.get({ plain: true });
      res.render('order', {
        order: order,
        logged_in: req.session.logged_in,
        username: req.session.name,
      });
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
      include: { model: ProductCart, include: Product },
    });

    console.log(cart);

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
