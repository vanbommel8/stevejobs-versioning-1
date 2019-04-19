const host = 'localhost';
const dbName = 'dbUser';
var express = require("express")
var app = express();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${host}/${dbName}`);

var db = mongoose.connection;
db.on('error', function() {
    console.error('Connection error!')
});
db.once('open', function() {
    console.log('DB connection Ready');
});

var User = require('./models/model');
app.listen(3001)
module.exports=app;