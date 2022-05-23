const express = require('express');
const router = express.Router();
const taskController = require('../app/api/controllers/tasks');
router.get('/', taskController.getAll);
router.get('/:taskId', taskController.getById);
router.post('/', taskController.create);
router.put('/:taskId', taskController.updateById);
router.delete('/:taskId', taskController.deleteById);

module.exports = router;