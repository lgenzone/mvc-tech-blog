const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

const sequelize = require('../../config/connection');


router.get('/', async (req, res) => {
  try {
    const postList = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content', 
        'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'text',
            'user_id',
            'post_id',
            'created_at'
        ],
          include: { 
            model: User,
            attributes: ['username']
            }
        },
        { model: User,
          attributes: ['username']
        }
      ]
    });
    const posts = postList.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;