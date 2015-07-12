var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var database = require('./../connection');
var usersCollection = database.get('users');

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'sign up' });
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

router.get('/addUser', function(req, res, next) {
  req.session.username = req.session.passport.user.username;
  usersCollection.update({username: req.session.passport.user.username}, {username: req.session.passport.user.username, name: req.session.passport.user.displayName, email: req.session.passport.user.email, password: 'github'}, {upsert: true})
  res.redirect('/');
});

router.get('/auth/github', passport.authenticate('github', {scope: [ 'user:email']}), function (req, res) {
});

router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/addUser',
}));

router.post('/signup', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  usersCollection.update({username: req.body.username}, {username: req.body.username, name: req.body.name, email: req.body.email, password: hash}, {upsert: true})
  req.session.username = req.body.username;
  res.redirect('/' + req.session.username);
});

router.post('/login', function(req, res, next) {
  usersCollection.findOne({email: req.body.email}, function (err, data) {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      req.session.username = data.username;
      res.redirect('/' + req.session.username);
    }
    else {
      res.redirect('/login');
    }
  })
});

module.exports = router;
