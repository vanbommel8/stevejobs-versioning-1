var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: Array,
    dateOfBirth: String,
    gender: String
});

var User =  new mongoose.model('User', userSchema);

module.exports = User;
