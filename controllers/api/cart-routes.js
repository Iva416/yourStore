const router = require('express').Router();
const { Cart } = require('../../models');
const auth = require('../../utils/auth');

// GET to get cart with the provided user id
router.get('/', auth, async (req, res) => {
  try {
    const cartData = await Cart.findOne({
      where: { user_id: req.session.user_id },
    });

    res.json(cartData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
