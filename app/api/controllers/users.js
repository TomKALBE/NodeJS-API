const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
    create: function(req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err) 
                next(err);
            else
                res.json({status: "success", message: "User added successfully!!!", data: null});
        });
    },
}