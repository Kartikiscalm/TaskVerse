require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// Production CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
            throw new Error('MONGODB_URI is required in production');
        }

        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskverse';
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB connected natively');
    } catch (err) {
        if (process.env.NODE_ENV === 'production') {
            console.error('CRITICAL: Database connection failed in production:', err.message);
            process.exit(1);
        } else {
            console.log('Native MongoDB connection failed, spinning up In-Memory DB...');
            const mongoServer = await MongoMemoryServer.create();
            await mongoose.connect(mongoServer.getUri());
            console.log('In-Memory MongoDB connected automatically!');
        }
    }
};

connectDB();

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/groups', groupRoutes);

if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
