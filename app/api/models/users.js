const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
});
// hash user password before saving into database
UserSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
UserSchema.methods.joiValidate = function(obj) {
	var Joi = require('joi');
	var schema = {
		username: Joi.types.String().min(6).max(30).required(),
		password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
		email: Joi.types.String().email().required(),
	}
	return Joi.validate(obj, schema);
}
 
module.exports = mongoose.model("User", UserSchema);
