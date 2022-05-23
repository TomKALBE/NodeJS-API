const movieModel = require("../models/tasks");
module.exports = {
    getById: function (req, res, next) {
        movieModel.findById(req.params.taskId, function (err, taskInfo) {
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
        movieModel.find({}, function (err, tasks) {
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
                res.json({
                    status: "success",
                    message: "Tasks list found!!!",
                    data: { tasks: tasksList },
                });
            }
        });
    }
};
