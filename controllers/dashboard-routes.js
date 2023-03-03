const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content'
            ],
            include: [
                {
                    model: Comment, 
                    attributes: [
                        'id',
                        'text',
                        'user_id',
                        'post_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const posts = dbPostData.map(post => post.get({ plain:true }));
        res.render('dashboard', {posts, loggedIn: true });
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;