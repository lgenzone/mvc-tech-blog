const router = require('express').Router();
const homepage = require('./home-routes');
//const dashboard = require('./dashboard-routes');
//const apiRoutes = require('../api');

router.use('./', homepage);




module.exports = router; 