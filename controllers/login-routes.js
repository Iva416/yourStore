const router = require('express').Router();

//Route to get all product
router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
