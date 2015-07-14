var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var database = require('./../connection');
var usersCollection = database.get('users');
var Error = require('./../error');
var Errors = new Error;

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'sign up' });
});

// Authorization
// router.use(function (req,res,next) {
//   if (req.session = null) {
//     redirect('/')
//   }
//   else {
//     next();
//   }
// })

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

router.post('/signup', function (req,res,next) {
  usersCollection.findOne({email: req.body.email.trim()}, function (err, data) {
    var email = req.body.email.trim().toLowerCase();
    var username = req.body.username.trim();
    var name = req.body.name.trim();
    if (data === null) {
      next();
    }
    else {
      res.render('signup', {signUpName: name, email: email, username: username, errors: ["email already exists"]})
    }
  })
}, function (req,res,next) {
  usersCollection.findOne({username: req.body.username.trim()}, function (err, data) {
    var email = req.body.email.trim().toLowerCase();
    var username = req.body.username.trim();
    var name = req.body.name.trim();
    if (data === null) {
      next();
    }
    else {
      res.render('signup', {signUpName: name, email: email, username: username, errors: ["username already exists"]})
    }
  })
}, function(req, res, next) {
  var email = req.body.email.trim().toLowerCase();
  var password = req.body.password;
  var username = req.body.username.trim();
  var name = req.body.name.trim();
  var confirmation = req.body.confirmation;
  Errors.validateEmail(email);
  Errors.validatePassword(password, confirmation);
  Errors.validateInput(username, 'username');
  Errors.validateInput(name, 'name');
  if (Errors.errArr.length !== 0) {
    res.render('signup', {errors: Errors.errArr, signUpName: name, email: email, username: username})
    Errors.errArr = [];
  }
  else {
    var hash = bcrypt.hashSync(password, 8);
    usersCollection.insert({username: username, name: name, email: email, password: hash})
    req.session.username = username;
    res.redirect('/' + req.session.username);
  }
});

router.post('/login', function(req, res, next) {
  var email = req.body.email.trim().toLowerCase();
  var password = req.body.password;
  Errors.validateEmail(email);
  Errors.validatePassword(password, password);
  if (Errors.errArr.length !== 0) {
    res.render('login', {email: email, errors: Errors.errArr})
    Errors.errArr = [];
  }
  else {
    usersCollection.findOne({email: email}, function (err, data) {
      if (data === null) {
        res.render('login', {email: email, errors: ["email is not registered"]})
      }
      else if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.username = data.username;
        res.redirect('/' + req.session.username);
      }
      else {
        res.render('login', {email: email, errors: ["incorrect password"]})
      }
    })
  }
});

module.exports = router;
