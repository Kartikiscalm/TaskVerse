const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
    try {
        const { groupName } = req.body;
        if (!groupName) return res.status(400).json({ message: 'Group name is required' });

        const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const group = new Group({
            name: groupName,
            inviteCode,
            owner: req.user.user.id,
            members: [req.user.user.id]
        });

        await group.save();
        res.json(group);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.joinGroup = async (req, res) => {
    try {
        const { inviteCode } = req.body;
        if (!inviteCode) return res.status(400).json({ message: 'Invite code is required' });

        const group = await Group.findOne({ inviteCode });
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (group.members.length >= group.maxMembers) {
            return res.status(400).json({ message: 'Group is at maximum capacity (5 members)' });
        }

        if (group.members.includes(req.user.user.id)) {
            return res.status(400).json({ message: 'You are already in this group' });
        }

        group.members.push(req.user.user.id);
        await group.save();
        res.json(group);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getMyGroup = async (req, res) => {
    try {
        const group = await Group.findOne({ members: req.user.user.id })
            .populate('members', 'name xp level streak currency');

        if (!group) return res.status(404).json({ message: 'No group detected' });
        res.json(group);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.leaveGroup = async (req, res) => {
    try {
        const group = await Group.findOne({ members: req.user.user.id });
        if (!group) return res.status(404).json({ message: 'Group not found' });

        group.members = group.members.filter(m => m.toString() !== req.user.user.id);

        if (group.members.length === 0) {
            await Group.findByIdAndDelete(group._id);
        } else {
            if (group.owner.toString() === req.user.user.id) {
                group.owner = group.members[0];
            }
            await group.save();
        }

        res.json({ message: 'Left successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
