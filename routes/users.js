const express = require('express');
const router = express.Router();
var User = require('../models/model');

const {check} = require('express-validator/check');
router.post('/',
  function(req, res) {
  const newUser = new User(req.body);
  newUser.save(function(err) {
      if (err) return res.status(500).json({error: err});
      res.status(201).json(newUser);
  });
});

  router.get('/', function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).json({error: err});
      res.json(users);
    });
  });
  
  router.get('/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) return res.status(500).json({error: err});
      if (!user) return res.status(404).json({message: 'Utente non trovato'});
      res.json(user);
    });
  });
  router.get('/name/:name', function(req, res) {
    User.findOne({name: req.params.name}, function(err, user) {
      if (err) return res.status(500).json({error: err});
      if (!user) return res.status(404).json({message: 'Utente non trovato'});
      res.json(user);
    });
  });

  router.put('/:id', function(req, res) {
    User.findOne({_id: req.params.id})
        .exec(function(err, user) {
          if (err) return res.status(500).json({error: err});
          if (!user) {
            return res.status(404).json({message: 'Utente non trovato'});
          }
          for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
              user[key] = req.body[key];
            }
          }
          user.save(function(err) {
            if (err) return res.status(500).json({error: err});
            res.json(user);
          });
        });
  });
  
  router.delete('/:id', function(req, res) {
    User.findOne({_id: req.params.id})
        .exec(function(err, user) {
          if (err) return res.status(500).json({error: err});
          if (!user) return res.status(404).json({message: 'Utente non trovato'});
          User.remove({_id: req.params.id}, function(err) {
            if (err) return res.status(500).json({error: err});
            res.json({message: 'Utente eliminato correttamente'});
          });
        });
  });
module.exports = router;


