const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');

// homepage
router.get('/', async (req, res) => {
   try {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });
    //res.status(200).json(posts);
   //res.render('homepage', {posts, loggedIn: req.session.loggedIn});
   res.render('homepage', {posts});
   } catch (err) {
    res.status(500).json({ message: 'An error occurred, please try again.'})
   }
});

// login page




module.exports = router;