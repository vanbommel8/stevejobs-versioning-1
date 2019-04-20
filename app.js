var User = require('mongoose');
const express = require('express');
var app=express();
const User = require('../models/model');

// create a new user
app.post('/',function(req,res){ 
  var newUser = new User(req.body);
  newUser.save(function (err) {
  if (err) return handleError(err);
  // saved!
  });})
  

