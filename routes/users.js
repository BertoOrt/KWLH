var express = require('express');
var router = express.Router();
var database = require('./../connection');
var usersCollection = database.get('users');

router.get('/:username', function(req, res, next) {
  res.render('users/index', { title: 'Know/What/Learn/How', username: req.params.username });
});

router.get('/:username/new', function(req, res, next) {
  res.render('users/new', { title: 'New', username: req.params.username });
});

router.post('/new', function(req, res, next) {
  res.redirect('/' + req.session.username)
});

router.get('/:username/:chart/edit', function(req, res, next) {
  res.render('users/edit', { title: 'Edit', username: req.params.username });
});

router.get('/:username/:chart', function(req, res, next) {
  res.render('users/show', { title: req.params.chart, username: req.params.username });
});

module.exports = router;
