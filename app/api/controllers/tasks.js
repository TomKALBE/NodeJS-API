const taskModel = require("../models/tasks");
module.exports = {
    getById: function (req, res, next) {
        taskModel.findById(req.params.taskId, function (err, taskInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Task found!!!",
                    data: { movies: taskInfo },
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let tasksList = [];
        taskModel.find({}, function (err, tasks) {
            if (err) {
                next(err);
            } else {
                for (let task of tasks) {
                    tasksList.push({
                        id: task._id,
                        description: task.description,
                        done: task.done,
                    });
                }
                res.status(200)
                res.json({
                    status: "success",
                    message: "Tasks list found!!!",
                    data: { tasks: tasksList },
                });
            }
        });
    },
    create: function (req, res, next) {
        taskModel.create(
            { description: req.body.description, done: req.body.done },
            function (err, result) {
                if (err) next(err);
                else{
                    res.status(201)
                    res.json({
                        status: "success",
                        message: "Task added successfully!!!",
                        data: null,
                    });
                }
            }
        );
    },
};
