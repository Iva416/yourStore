const router = require('express').Router();

const {
  Cart,
  ProductCart,
  Order,
  ProductOrder,
  Product,
} = require('../../models');
const withAuth = require('../../utils/auth');

// GET to get cart with the provided user id
// router.get('/', auth, async (req, res) => {
//   try {
//     const cartData = await Cart.findOne({
//       where: { user_id: req.session.user_id },
//     });

//     res.json(cartData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
//get all products from user shopping cart
router.get('/', withAuth, async (req, res) => {
  try {
    const rawProduct = await Cart.findOne({
      where: { user_id: req.session.user_id },
      include: [{ model: ProductCart, include: Product }],
    });

    const product = rawProduct.get({ plain: true });

    res.render('cart', {
      ...product,
      logged_in: req.session.logged_in,
      username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/', withAuth, async (req, res) => {
  try {
    const rawData = await ProductCart.findOne({
      where: {
        cart_id: req.body.cid,
        product_id: req.body.pid,
      },
    });
    const mapping = rawData.get({ plain: true });
    const result = await ProductCart.destroy({
      where: { id: mapping.id },
    });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/test', async (req, res) => {
//   const rawList = await ProductCart.findAll({
//     where: { cart_id: 2 },
//   });
//   res.json(rawList);
// });

router.post('/submit/:id', withAuth, async (req, res) => {
  //check user ownership of cart
  const rawCart = await Cart.findByPk(req.params.id);
  const cart = rawCart.get({ plain: true });
  if (req.session.user_id === cart.user_id) {
    const rawList = await ProductCart.findAll({
      where: { cart_id: req.params.id },
    });

    if (rawList.length) {
      const rawOrder = await Order.create({ user_id: req.session.user_id });
      const order = rawOrder.get({ plain: true });

      const productList = rawList.map((elm) => {
        elm.get({ plain: true });
        return {
          order_id: order.id,
          product_id: elm.get({ plain: true }).product_id,
        };
      });
      console.log(productList);
      const rawOrderDetail = await ProductOrder.bulkCreate(productList, {
        individualHooks: true,
        returning: true,
      });
      console.log(rawOrderDetail);
      const OrderDetail = rawOrderDetail.map((elm) => elm.get({ plain: true }));

      for (let i = 0; i < rawList.length; i++) {
        const map = rawList[i].get({ plain: true });
        await ProductCart.destroy({ where: { id: map.id } });
      }

      res.json(OrderDetail);
    } else {
      res.status(400).json({ message: 'Your shopping cart is empty.' });
    }
  }
});

module.exports = router;
