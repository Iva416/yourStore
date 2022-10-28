const router = require('express').Router();
const { User } = require('../../models');

// POST register
router.post('/register', async (req, res) => {
  try {
    let userCheck = await User.findOne({ where: { email: req.body.email } });
    if (userCheck === null) {
      await User.create(req.body);

      res.redirect(307, '/api/user/login');
    } else {
      // Email already assocciated with account
      res.status(201).json('An account with this email already exists');
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
