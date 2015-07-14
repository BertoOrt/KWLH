var express = require('express');
var router = express.Router();
var database = require('./../connection');
var chartsCollection = database.get('charts');
var markdown = require('./../public/Javascripts/markdown');

//***********
//** INDEX **
//***********
router.get('/', function(req, res, next) {
  chartsCollection.find({}, {}, function (err, docs) {
    if (req.session === null) {
      var username = undefined;
    }
    else {
      var username = req.session.username;
    }
    res.render('charts/index', {title: 'Charts', charts: docs, username: username});
  });
});


//*********
//** NEW **
//*********
router.get('/:username/new', function (req, res, next) {
  if (req.session === null) {
    res.redirect('/')
  }
  else if (req.params.username !== req.session.username) {
    res.redirect('/')
  }
  else {
    next()
  }
}, function(req, res, next) {
  res.render('charts/new', {username: req.params.username});
});

//**********
//** SHOW **
//**********
router.get('/:username/:id', function (req,res,next) {
  if (req.params.id.length === 24) {
    next();
  }
  else {
    res.redirect('/')
  }
}, function (req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    if (doc === null) {
      res.redirect('/')
    }
    else if (req.params.username !== doc.username) {
      res.redirect('/')
    }
    else {
      next();
    }
  });
}, function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    var know = markdown.mark(doc.know);
    var want = markdown.mark(doc.want);
    var learned = markdown.mark(doc.learned);
    var how = markdown.mark(doc.how);
    var username;
    if (req.session === null) {
      username = undefined;
    }
    else {
      username = req.session.username;
    }
    res.render('charts/show', {username: username, name: username, id: req.params.id, topic: doc.topic, know: know, want: want, learned: learned, how: how});
  });
});

router.use('/:username',function (req, res, next) {
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

router.get('/:username', function(req, res, next) {
  chartsCollection.find({username: req.params.username}, function (err, docs) {
    res.render('users/index', { title: 'Know/What/Learn/How', charts: docs, username: req.params.username });
  })
});

//************
//** CREATE **
//************
router.post('/:username/charts', function(req, res, next) {
  chartsCollection.insert({username: req.session.username, topic: req.body.topic, know: req.body.know, want: req.body.want, private: req.body.private})
  res.redirect('/' + req.session.username);
});

//**********
//** EDIT **
//**********
router.get('/:username/:id/edit', function (req,res,next) {
  if (req.params.id.length === 24) {
    next();
  }
  else {
    res.redirect('/')
  }
}, function (req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    if (doc === null) {
      res.redirect('/')
    }
    else if (req.params.username !== doc.username) {
      res.redirect('/')
    }
    else {
      next();
    }
  });
}, function(req, res, next) {
  chartsCollection.findOne({_id: req.params.id}, {}, function (err, doc) {
    res.render('charts/edit', {username: req.session.username, chart:doc});
  });
});

//************
//** UPDATE **
//************
router.post('/:username/charts/:id', function(req, res, next) {
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
