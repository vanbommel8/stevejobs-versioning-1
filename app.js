var express = require ('express');
var app = express();
var cors = require('cors')
var read = require ("./routes/read.js");
var modify = require ("./routes/modify.js");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
const host = 'localhost';
const dbName = 'myDatabase';
const mongoose = require('mongoose');


//connection to database
mongoose.connect('mongodb://'+ host + '/' + dbName);
var db = mongoose.connection;
db.on('error', function() {
console.error('Connection error!')
});
db.once('open', function() {
console.log('DB connection Ready');
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", read);
app.use("/modify", modify);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup logger and body parser
app.use(morgan('dev'));
app.use(bodyParser.json());

// Setup static public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);

module.exports = app;