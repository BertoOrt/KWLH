var express = require('express');
var router = express.Router();
var database = require('monk')(process.env.MONGOLAB_URI);
var db = database.get('users');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'know-want-learn (how)' });
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'charts' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'sign up' });
});

module.exports = router;
