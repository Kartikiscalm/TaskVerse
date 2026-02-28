const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { username, mode } = req.body; // mode: 'signup' or 'signin'
        console.log(`Auth Request: mode=${mode}, user=${username}`);
        if (!username) return res.status(400).json({ message: 'Username is required' });

        // Using email field structurally temporarily mapping to username
        let user = await User.findOne({ email: username });

        if (mode === 'signup') {
            if (user) {
                return res.status(400).json({ message: 'username already exists, please create another one' });
            }
            user = new User({ name: username, email: username, googleId: 'local-' + username });
            await user.save();
        } else {
            // Sign-in mode
            if (!user) {
                return res.status(404).json({ message: 'Identity not found in the matrix' });
            }
        }

        const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
        res.json({ token: jwtToken, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
