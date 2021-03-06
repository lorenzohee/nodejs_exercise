/**
 * Created by Lorenzo on 2016/4/1.
 */
var express = require('express'),
    router = express.Router(),
    authorize = require('../filter/loginAuthorize')
    BlogController = require('../controllers/blogController');

router.get('/', function(req, res){
    res.redirect('/blog/index')
});
router.get('/index', BlogController.index);
router.get('/new', authorize.authorize, BlogController.new);
router.post('/new', BlogController.create);
router.get('/detail/:id', BlogController.detail);
router.get('/edit/:id', BlogController.edit);
router.post('/edit/:id', BlogController.update);
router.get('/delete/:id', BlogController.delete);

module.exports = router;