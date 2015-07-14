var express = require('express');
var router = express.Router();
var database = require('./../connection');
var usersCollection = database.get('users');

router.use('/:username', function (req, res, next) {
  if (req.session === null) {
    res.redirect('/')
  }
  else if (req.params.username !== req.session.username) {
    res.redirect('/')
  }
  else {
    next()
  }
})

//**********
//** EDIT **
//**********
router.get('/:username/edit', function(req, res, next) {
  usersCollection.findOne({username: req.params.username}, function (err, data) {
    res.render('users/edit', { title: 'Edit Profile', profile: data });
  })
});

//************
//** UPDATE **
//************
router.post('/:username/edit', function(req, res, next) {
  req.session.username = req.body.username;
  usersCollection.update({username: req.params.username}, {$set: {username: req.body.username, name: req.body.name, email: req.body.email}})
  res.redirect('/' + req.session.username);
});

//*************
//** DESTROY **
//*************
router.post('/:username/delete', function(req, res, next) {
  usersCollection.remove({username: req.params.username});
  req.session = null;
  res.redirect('/')
});

module.exports = router;
