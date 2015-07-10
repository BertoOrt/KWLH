var express = require('express');
var router = express.Router();
var database = require('./../connection');
var chartsCollection = database.get('charts');

//***********
//** INDEX **
//***********
router.get('/charts', function(req, res, next) {
  chartsCollection.find({}, {}, function (err, docs) {
    res.render('charts/index', {charts: docs});
  });
});

//*********
//** NEW **
//*********
router.get('/charts/new', function(req, res, next) {
  res.render('charts/new');
});

//**********
//** SHOW **
//**********
router.get('/charts/:id', function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    res.render('charts/show', {chart: doc});
  });
});

//************
//** CREATE **
//************
router.post('/charts', function(req, res, next) {
  chartsCollection.insert({topic: req.body.topic, know: req.body.know, want: req.body.want});
  res.redirect('/charts');
});

//**********
//** EDIT **
//**********
router.get('/charts/:id/edit', function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    res.render('charts/edit', {chart:doc});
  });
});

//************
//** UPDATE **
//************
router.post('/charts/:id', function(req, res, next) {
  chartsCollection.update({_id: req.params.id}, {$set: {topic: req.body.topic, know: req.body.know, want: req.body.want, learned: req.body.learned, how: req.body.how}});
  res.redirect('/charts/' + req.params.id);
});

//*************
//** DESTROY **
//*************
router.post('/charts/:id/delete', function(req, res, next) {
  chartsCollection.remove({_id: req.params.id});
  res.redirect('/charts');
});

module.exports = router;
