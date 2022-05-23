const express = require('express');
const router = express.Router();
const taskController = require('../app/api/controllers/tasks');
router.get('/', taskController.getAll);
router.get('/:taskId', taskController.getById);
module.exports = router;