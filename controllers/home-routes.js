const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');

// homepage
router.get('/', auth, async (req, res) => {
   try {
    const posts = await Post.findAll({
        raw: true,
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });
    res.render('homepage', {posts, loggedIn: req.session.loggedIn});
   } catch (err) {
    res.status(500).json({ message: 'An error occurred, please try again.'})
   }
});

// login page




module.exports = router;