const Task = require('../models/Task');

exports.getWeeklyAnalytics = async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Mocking 7 days ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const tasks = await Task.find({
            userId,
            createdAt: { $gte: oneWeekAgo }
        });

        let totalCompleted = 0;
        let totalActive = 0;
        let highAssigned = 0;
        let highCompleted = 0;

        tasks.forEach(task => {
            if (task.completed) totalCompleted++;
            else totalActive++;

            if (task.priority === 'High') {
                highAssigned++;
                if (task.completed) highCompleted++;
            }
        });

        const priorityAlignmentScore = highAssigned > 0 ? (highCompleted / highAssigned) * 100 : 0;

        res.json({
            totalCompleted,
            totalActive,
            priorityAlignmentScore
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
