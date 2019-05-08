const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: Array,
    dateOfBirth: String,
    gender: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
