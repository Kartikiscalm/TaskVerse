const Task = require('../models/Task');

exports.getWeeklyAnalytics = async (req, res) => {
    try {
        const userId = req.user.user.id;
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

exports.getCustomIntervalAnalytics = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const { days } = req.query;
        const intervalDays = parseInt(days) || 7;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - intervalDays);

        const tasks = await Task.find({
            userId,
            createdAt: { $gte: startDate }
        });

        const report = [];
        // Group by day for the interval
        for (let i = intervalDays - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];

            const dayTasks = tasks.filter(t => t.createdAt.toISOString().split('T')[0] === dateStr);
            const completed = dayTasks.filter(t => t.completed).length;
            const created = dayTasks.length;

            report.push({
                date: dateStr,
                completed,
                created
            });
        }

        res.json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
