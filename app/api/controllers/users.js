const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
    create: function(req, res, next) {
        const data = { name: req.body.name, email: req.body.email, password: req.body.password }
        userModel.create(data, function (err, result) {
            if (err) 
                next(err);
            else{
                res.status(201)
                res.json({status: "success",name: req.body.name, email: req.body.email});
            }
        });
    },
    authenticate: function(req, res, next) {
        userModel.findOne({email:req.body.email}, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                }else{
                    res.status(401)
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    }
}