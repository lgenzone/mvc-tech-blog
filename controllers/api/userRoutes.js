const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// login
router.post('./login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            };
        });

        if (!userData) {
            res.status(404).json({ message: 'Email does not exist. Please use valid email address, or create an account.'});
            return;
        }

        const password = await bcrypt.compare(req.body.password, userData.password);

        if (!password) {
            res.status(404).json({ message: 'Not a valid password'});
            return;
        }

        req.session.save(() => {
            req.session.logginIn = true;
            res.status(200).json({ message: 'Login successful!'});
        });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred. Please try again.'});
    }
});

module.exports = router;