var User = require('mongoose');

// create a new user
var newUser = mongoose.Schema({
  name: Peter,
  surname: Quill,
  email: starlord55@avengers.com,
  dateOfBirth: 32,
  gender: male
});

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});