var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    User = require('../models/user');

router.get('/full', function(req, res, next) {
  res.render('fullPage', { title: 'Express' });
});
router.get('/nav1', function(req, res, next) {
  res.render('nav1', { title: 'Express' });
});
router.get('/newyear', function(req, res, next) {
  res.render('newYear', { title: 'Express' });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '主页',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
});
router.post('/login', function(req, res, next) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  User.get(req.body.name, function(err, user){
    if(!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
    if(password!==user.password) {
      req.flash('error', '密码输入错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('登录成功');
    return res.redirect('/');
  })
});
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
});
router.post('/reg', function(req, res, next){
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  if(password !== password_re) {
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: name,
    password: password,
    email: req.body.email
  });
  User.get(newUser.name, function(err, user){
    if(err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if(user) {
      req.flash('error','用户已存在.');
      return res.redirect('/');
    }else {
      newUser.save(function(err, user) {
        if(err) {
          req.flash('error', '新增用户失败');
          return res.redirect('/reg');
        }
        req.flash('success', '注册成功');
        res.redirect('/');
      })
    }
  })
})
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});
module.exports = router;
