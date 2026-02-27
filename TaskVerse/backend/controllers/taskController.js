const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, priority, category, totalDays } = req.body;
        const task = new Task({
            userId: req.user.user.id,
            title,
            priority,
            category,
            totalDays: totalDays || 1
        });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.userId.toString() !== req.user.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.completed) {
            return res.status(400).json({ message: 'Task already completed' });
        }

        task.completedDays += 1;
        if (task.completedDays >= task.totalDays) {
            task.completed = true;
        }
        await task.save();

        const priorityWeights = { High: 3, Medium: 2, Low: 1 };
        const weight = priorityWeights[task.priority] || 1;
        const baseXP = 10;

        const user = await User.findById(req.user.user.id);

        // On completion
        const earnedXP = baseXP * weight;
        user.streak += 1;
        const bonusXP = user.streak * 2;
        user.xp += earnedXP + bonusXP;
        user.currency += Math.floor((earnedXP + bonusXP) / 2);

        user.level = Math.floor(user.xp / 100);
        await user.save();

        res.json({ task, user });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.userId.toString() !== req.user.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { totalDays } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task || task.userId.toString() !== req.user.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (totalDays !== undefined) {
            task.totalDays = Math.max(1, totalDays);
            if (task.completedDays >= task.totalDays) {
                task.completed = true;
            } else {
                task.completed = false;
            }
        }

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
