var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Know/What/Learn/How' });
});

router.post('/login', function(req, res, next) {
  res.cookie('email', req.body.email)
  res.redirect('/users/profile');
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('email');
  res.redirect('/');
});

module.exports = router;
