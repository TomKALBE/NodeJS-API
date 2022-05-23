//Set up mongoose connection
const mongoose = require('mongoose');
const url = 'mongodb://localhost/nodejsapi';
mongoose.connect(url);
mongoose.Promise = global.Promise;
module.exports = mongoose;