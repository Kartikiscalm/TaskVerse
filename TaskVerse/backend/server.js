require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// Dynamic CORS — allow localhost + any Vercel deployment
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        // Allow any vercel.app subdomain or explicitly allowed origins
        if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Lazy DB connection (serverless-safe) ---
let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) return;

    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('MongoDB connected');
};

// Middleware: connect DB before every request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB Connection Error:', err.message);
        res.status(500).json({ message: 'Database connection failed. Check server configuration.' });
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/groups', groupRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'TaskVerse API is online', timestamp: new Date().toISOString() });
});

// Local dev server
if (require.main === module) {
    const { MongoMemoryServer } = require('mongodb-memory-server');

    const startLocal = async () => {
        try {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskverse';
            await mongoose.connect(uri);
            console.log('MongoDB connected (local)');
        } catch {
            console.log('Local MongoDB failed, starting In-Memory DB...');
            const mongoServer = await MongoMemoryServer.create();
            await mongoose.connect(mongoServer.getUri());
            console.log('In-Memory MongoDB started!');
        }

        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    };

    startLocal();
}

module.exports = app;
