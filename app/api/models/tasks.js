const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },
    done: {
        type: Boolean,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model("Task", UserSchema);
