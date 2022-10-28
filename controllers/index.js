const router = require('express').Router();

const api = require('./api');
const home = require('./home-routes');
const login = require('./login-routes');

router.use('/login', login);
router.use('/api', api);
router.use('/', home);

module.exports = router;
