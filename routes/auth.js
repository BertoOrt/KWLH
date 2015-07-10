var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

router.post('/login', function(req, res, next) {
  req.session.email = req.body.email;
  res.redirect('/users/' + req.session.username);
});

router.get('/auth/github', passport.authenticate('github', {scope: [ 'user:email']}), function (req, res) {

});

router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/charts',
}));

router.post('/signup', function(req, res, next) {
  req.session.username = req.body.username;
  res.redirect('/users/' + req.session.username);
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
