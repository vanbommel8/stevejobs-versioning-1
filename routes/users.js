const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/',
  function(req, res) {
    const newUser = new User(req.body);
    newUser.save(function(err) {
      if (err) return res.status(500).json({error: err});
      res.status(201).json(newUser);
    });
  });


module.exports = router;


