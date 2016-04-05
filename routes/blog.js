/**
 * Created by Lorenzo on 2016/4/1.
 */
var express = require('express');
var router = express.Router();
var BlogController = require('../controllers/blogController');

router.get('/', function(req, res){
    res.redirect('/blog/index')
});
router.get('/index', BlogController.index);
router.get('/new', BlogController.new);
router.post('/new', BlogController.create);

module.exports = router;