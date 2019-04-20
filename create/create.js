var User = require('mongoose');

// create a new user

  var newUser = new User({ name: 'Mario ', });
  newUser.save(function (err) {
  if (err) return handleError(err);
  // saved!
  });

