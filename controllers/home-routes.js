const router = require('express').Router();
const {
  Product,
  Cart,
  ProductCart,
  ProductOrder,
  Order,
} = require('../models');
const withAuth = require('../utils/auth');
const { format_date } = require('../utils/helpers');

//Route to get all product
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    if (req.session.user_id) {
      const cartData = await Cart.findOne({
        where: { user_id: req.session.user_id },
        include: [{ model: ProductCart }],
      });

      let NumInCart = 0;
      if (cartData !== null) {
        NumInCart = cartData.product_carts.length;
      }
      const product = productData.map((product) =>
        product.get({ plain: true })
      );
      res.render('home', {
        product,
        NumInCart,
        logged_in: req.session.logged_in,
        username: req.session.name,
      });
    } else {
      const NumInCart = 0;
      const product = productData.map((product) =>
        product.get({ plain: true })
      );
      res.render('home', {
        product,
        NumInCart,
        logged_in: req.session.logged_in,
        username: req.session.name,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all products from user shopping cart
router.get('/cart', withAuth, async (req, res) => {
  try {
    const rawProduct = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart, include: Product }],
    });

    if (rawProduct !== null) {
      const product = rawProduct.get({ plain: true });
      let NumInCart = rawProduct.product_carts.length;
      res.render('cart', {
        ...product,
        NumInCart,
        logged_in: req.session.logged_in,
        username: req.session.name,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', { NumInCart: 0 });
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

// GET get all orders from the active user
router.get('/orders', withAuth, async (req, res) => {
  try {
    const orderData = await Order.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: ProductOrder, include: Product }],
    });

    const cartData = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart }],
    });
    let NumInCart = cartData.product_carts.length;

    const orders = orderData.map((order) => order.get({ plain: true }));

    for (const index in orders) {
      orders[index].creation_time = format_date(orders[index].creation_time);
    }

    res.render('orders', {
      orders: orders,
      NumInCart,
      logged_in: req.session.logged_in,
      username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display all products in the order
router.get('/orders/:id', withAuth, async (req, res) => {
  try {
    const orderData = await Order.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: { model: ProductOrder, include: Product },
    });

    const cartData = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart }],
    });
    let NumInCart = cartData.product_carts.length;

    if (orderData !== null) {
      const order = orderData.get({ plain: true });
      order.creation_time = format_date(order.creation_time);
      res.render('order', {
        NumInCart,
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

router.get('/aboutUs', async (req, res) => {
  try {
    res.render('aboutus', { NumInCart: 0 });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
