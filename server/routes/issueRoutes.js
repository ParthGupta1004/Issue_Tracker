const express = require('express');
const router = express.Router();
const {
    getIssues,
    createIssue,
    updateIssue,
    deleteIssue
} = require('../controllers/issueController');

router.get('/', getIssues);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

module.exports = router;
