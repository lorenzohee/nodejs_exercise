/**
 * Created by Lorenzo on 2016/4/1.
 */

var Blog = require('../models/blog')
exports.index = function(req, res) {
    var blogs = new Blog({});
    blogs.index(function(err, collections){
        if(err){
            req.flash('error', '');
            return res.render('blog/index', {
                title: 'blog',
                blogs: [],
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString() });
        }
        res.render('blog/index', {
            title: 'blog',
            user: req.session.user,
            blogs: collections,
            success: req.flash('success').toString(),
            error: req.flash('error').toString() });
    })
};

exports.new = function(req, res) {
    _renderNew(req, res);
};

exports.create = function(req, res) {
    var title = req.body.title,
        content = req.body.content,
        userId = req.session.user.id,
        created_time = new Date();
    if(title==''){
        req.flash('error', '请输入标题!');
        return _renderNew(req, res);
    }
    var blog = new Blog({
        title: title,
        content: content,
        userId: userId,
        created_time: created_time
    });
    blog.create(function(err, newBlog){
        if(err){
            req.flash('error', '新增文章失败');
            return _renderNew(req, res);
        };
        req.flash('success', '新增一篇文章');
        res.redirect('/blog/index');
    })
};

var _renderNew = function(req, res){
    res.render('blog/new', {
        title: 'new Blog',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
}