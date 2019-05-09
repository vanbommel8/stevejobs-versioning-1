var mongoose = require('mongoose');
var express = require("express");
var bodyParser = require("body-parser");


const routes = require('./routes/index');
const usersRoutes = require('./routes/users');



const host = 'localhost';
let dbName = 'User';



mongoose.connect('mongodb://'+ host + '/' + dbName, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', function() {
  console.error('Connection error!');
});
db.once('open', function() {

    console.log('DB connection Ready');
  
}); 

var app = express();
app.use(bodyParser.json());

app.use('/', routes);
app.use('/users', usersRoutes);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
      .json({message: err.message, error: err});
});
var User = require('./models/model');
app.listen(3001)
module.exports = app;

