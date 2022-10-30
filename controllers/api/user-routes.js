const router = require('express').Router();
const { User, Cart } = require('../../models');

// POST register
router.post('/register', async (req, res) => {
  try {
    let userCheck = await User.findOne({ where: { email: req.body.email } });
    if (userCheck === null) {
      const userData = await User.create(req.body);
      const user = userData.get({ plain: true });
      await Cart.create({
        user_id: user.id,
      });
      res.redirect(307, '/api/user/login');
    } else {
      // Email already assocciated with account
      res.status(401).json('An account with this email already exists');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.name = userData.name;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
