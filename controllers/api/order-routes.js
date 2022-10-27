const router = require('express').Router();
const { Order } = require('../../models');
const auth = require('../../utils/auth');

// GET get all orders from the active user
router.get('/', auth, async (req, res) => {
  try {
    const orderData = await Order.findAll({
      where: { user_id: req.session.user_id },
    });

    res.json(orderData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
