/**
 * Created by Lorenzo on 2016/4/1.
 */

var Blog = require('../models/blog'),
    markdown = require('markdown').markdown,
    RenderModel = require('../controllers/renderModel');
exports.index = function(req, res) {
    var blogs = new Blog({});
    blogs.index(function(err, collections){
        if(err){
            req.flash('error', '');
            var object = {
                title: 'blog',
                url: 'blog/index',
                currentNav: 'solution',
                data: {
                    title: 'blog',
                    blogs: []
                }
            };
            return RenderModel.renderModel(req, res, object);
        }
        var object = {
            title: 'blog',
            url: 'blog/index',
            currentNav: 'solution',
            data: {
                title: 'blog',
                blogs: collections
            }
        };
        RenderModel.renderModel(req, res, object);
    })
};

exports.new = function(req, res) {
    _renderNew(req, res);
};

exports.create = function(req, res) {
    var title = req.body.title,
        content = req.body.content,
        userId = req.session.user._id,
        userName = req.session.user.name,
        created_time = new Date().getTime();
    if(title==''){
        req.flash('error', '请输入标题!');
        return _renderNew(req, res);
    }
    var blog = new Blog({
        title: title,
        content: content,
        userId: userId,
        userName: userName,
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

exports.edit = function(req, res){
    var blog = new Blog({
        id: req.params.id
    });
    blog.findById(function(err, newBlog){
        if(err){
            req.flash('error', '查询失败');
            return _renderNew(req, res);
        };
        req.flash('success', '查询成功');

        var object = {
            url: 'blog/edit',
            currentNav: 'solution',
            data: {
                title: 'blog',
                blog: newBlog
            }
        };
        RenderModel.renderModel(req, res, object);
    })
}

exports.update = function(req, res){
    var blog = new Blog({
        id: req.params.id,
        title: req.body.title,
        content:req.body.content
    });
    blog.update(function(err){
        if(err){
            req.flash('error', '更新失败');
            return res.redirect('/blog/edit/'+blog.id);
        }
        req.flash('success', '更新成功');
        res.redirect('/blog/detail/'+blog.id);
    })
};

exports.delete = function(req, res){
    var blog = new Blog({
        id: req.params.id
    });
    blog.deleteById(function(err){
        if(err){
            req.flash('error', '删除失败');
            return res.redirect('/blog/detail/'+blog.id);
        }
        req.flash('success', '成功删除');
        res.redirect('/blog/index');
    })
}

exports.detail = function(req, res){
    var blog = new Blog({
        id: req.params.id
    });
    blog.findById(function(err, newBlog){
        if(err){
            req.flash('error', '查询失败');
            return _renderNew(req, res);
        };
        req.flash('success', '查询成功');

        if(newBlog){
            newBlog.content = markdown.toHTML(newBlog.content);
        };
        var object = {
            url: 'blog/detail',
            currentNav: 'solution',
            data: {
                title: 'blog',
                blog: newBlog
            }
        };
        RenderModel.renderModel(req, res, object);
    })
}
var _renderNew = function(req, res){
    res.render('blog/new', {
        title: 'new Blog',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
}