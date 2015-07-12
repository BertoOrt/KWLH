var express = require('express');
var router = express.Router();
var database = require('./../connection');
var chartsCollection = database.get('charts');

//***********
//** INDEX **
//***********
router.get('/', function(req, res, next) {
  chartsCollection.find({}, {}, function (err, docs) {
    res.render('charts/index', {charts: docs, username: req.session.username});
  });
});

router.get('/:username', function(req, res, next) {
  chartsCollection.find({username: req.params.username}, function (err, docs) {
    res.render('users/index', { title: 'Know/What/Learn/How', charts: docs, username: req.params.username });
  })
});

//*********
//** NEW **
//*********
router.get('/:username/new', function(req, res, next) {
  res.render('charts/new', {username: req.params.username});
});

//**********
//** SHOW **
//**********
router.get('/:username/:id', function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    res.render('charts/show', {username: req.session.username, id: req.params.id, chart: doc});
  });
});

//************
//** CREATE **
//************
router.post('/charts', function(req, res, next) {
  chartsCollection.insert({username: req.session.username, topic: req.body.topic, know: req.body.know, want: req.body.want, private: req.body.private})
  res.redirect('/' + req.session.username);
});

//**********
//** EDIT **
//**********
router.get('/:username/:id/edit', function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    res.render('charts/edit', {username: req.session.username, chart:doc});
  });
});

//************
//** UPDATE **
//************
router.post('/charts/:id', function(req, res, next) {
  chartsCollection.update({_id: req.params.id}, {$set: {topic: req.body.topic, know: req.body.know, want: req.body.want, learned: req.body.learned, how: req.body.how, private: req.body.private}});
  res.redirect('/'+ req.session.username + '/' + req.params.id);
});

//*************
//** DESTROY **
//*************
router.post('/:username/:id/delete', function(req, res, next) {
  chartsCollection.remove({_id: req.params.id});
  res.redirect('/'+req.session.username);
});

module.exports = router;
