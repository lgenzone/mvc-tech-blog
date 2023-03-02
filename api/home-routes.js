const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');

const sequelize = require('../config/connection');


router.get('/', async (req, res) => {

});

module.exports = router;