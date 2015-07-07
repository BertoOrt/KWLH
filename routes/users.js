var express = require('express');
var router = express.Router();

router.get('/:username', function(req, res, next) {
  res.render('users/index', { title: 'Know/What/Learn/How' });
});

router.get('/:username/new', function(req, res, next) {
  res.render('users/new', { title: 'New' });
});

router.get('/:username/edit', function(req, res, next) {
  res.render('users/edit', { title: 'Edit' });
});

module.exports = router;
