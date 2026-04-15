const Issue = require('../models/Issue');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Get all issues
// @route   GET /api/issues
const getIssues = async (req, res) => {
    try {
        const { search, status, priority } = req.query;
        let query = {};

        if (search && search.trim()) {
            query.title = { $regex: escapeRegExp(search.trim()), $options: 'i' };
        }

        if (status && status !== 'All') {
            query.status = status;
        }

        if (priority && priority !== 'All') {
            query.priority = priority;
        }

        const issues = await Issue.find(query).sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an issue
// @route   POST /api/issues
const createIssue = async (req, res) => {
    try {
        const { title, description, priority, assignedTo } = req.body;
        const issue = await Issue.create({
            title: title?.trim(),
            description: description?.trim(),
            priority,
            assignedTo: assignedTo?.trim() || 'Unassigned'
        });
        res.status(201).json(issue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an issue
// @route   PUT /api/issues/:id
const updateIssue = async (req, res) => {
    try {
        const updates = {};
        ['title', 'description', 'priority', 'status', 'assignedTo'].forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
            }
        });

        if (updates.assignedTo === '') {
            updates.assignedTo = 'Unassigned';
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getIssues,
    createIssue,
    updateIssue,
    deleteIssue
};
