const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.login = async (req, res) => {
    try {
        const { username, password, mode } = req.body; // mode: 'signup' or 'signin'
        console.log(`Auth Request: mode=${mode}, user=${username}`);

        if (!username || !password) {
            return res.status(400).json({ message: 'Identity and Encryption Key are required' });
        }

        if (mode === 'signup') {
            if (password.length < 8 || password.length > 64) {
                return res.status(400).json({ message: 'Encryption key must be between 8 and 64 characters' });
            }

            let user = await User.findOne({ email: username });
            if (user) {
                return res.status(400).json({ message: 'Designation already exists in the matrix' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            user = new User({
                name: username,
                email: username,
                password: hashedPassword,
                googleId: 'local-' + Date.now()
            });
            await user.save();

            const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
            return res.json({ token: jwtToken, user });
        } else {
            // Sign-in mode
            const user = await User.findOne({ email: username });
            if (!user) {
                return res.status(404).json({ message: 'Identity not found in the matrix' });
            }

            if (!user.password) {
                return res.status(400).json({ message: 'This account was created via Google. Please use Google Login.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid encryption key access' });
            }

            const jwtToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
            return res.json({ token: jwtToken, user });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Matrix Error' });
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

exports.googleLogin = async (req, res) => {
    try {
        const { googleToken } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, sub, picture } = ticket.getPayload();

        let user = await User.findOne({
            $or: [{ googleId: sub }, { email: email }]
        });

        if (!user) {
            user = new User({
                name: name,
                email: email,
                googleId: sub,
                avatar: picture
            });
            await user.save();
        } else if (!user.googleId) {
            // If user existed locally but now logs in with Google
            user.googleId = sub;
            user.avatar = picture;
            await user.save();
        }

        const jwtToken = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '7d' }
        );

        res.json({ token: jwtToken, user });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(401).json({ message: 'Google Authentication Failed' });
    }
};
