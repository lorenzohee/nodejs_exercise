var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');

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
router.get('/login', UserController.login);
router.post('/login', UserController.logup);
router.get('/reg', UserController.reg);
router.post('/reg', UserController.postReg)
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});
module.exports = router;
