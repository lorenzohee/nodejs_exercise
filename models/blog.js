/**
 * Created by Lorenzo on 2016/4/1.
 */
var mongodb = require('./db'),
    markdown = require('markdown').markdown,
    TimeManage = require('../common/timeManage'),
    ObjectId = require('mongodb').ObjectID,
    User = require('../models/user');

function Blog(blog){
    this.id = blog.id;
    this.title = blog.title;
    this.userId = blog.userId;
    this.content = blog.content;
    this.userName = blog.userName;
    this.created_time = blog.created_time
}

module.exports = Blog;

Blog.prototype.index = function(callback){
    var blog = {
        title: this.title,
        userId: this.userId,
        content: this.content,
        created_time: this.created_time
    }
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().sort({created_time:-1}).toArray(function(err, blogs){
                mongodb.close();
                if(err) {
                    return callback(err);
                };
                blogs.forEach(function(blog){
                    blog.content = markdown.toHTML(blog.content);
                    blog.created_time = TimeManage.formatTime(blog.created_time);
                });
                return callback(null, blogs);
            })
        })
    })
};

Blog.prototype.create = function(callback) {
    var blog = {
        title: this.title,
        content: this.content,
        userId: this.userId,
        userName: this.userName,
        created_time: this.created_time
    }
    mongodb.open(function(err, db){
        if(err) {
            return callback(err);
        };
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            collection.insert(blog,{
                safe: true
            }, function(err, blog){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, blog[0]);
            })
        })
    })
}

Blog.prototype.findById = function(callback){
    var blog = {
        id: this.id
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            console.log(collection);
            collection.findOne({_id:ObjectId(blog.id)},function(err, blog){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                if(blog){
                    blog.content = markdown.toHTML(blog.content);
                    blog.created_time = TimeManage.formatTime(blog.created_time);
                    callback(null, blog);
                }else {
                    callback(null, {title:'test',content:'content',created_time:'time',userName: 'name'});
                }
            })
        })
    })
}