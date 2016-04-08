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

/**
 * @description find all blogs
 * @param callback
 */
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
        });
    })
};

/**
 * @description create a new blog
 * @param callback
 */
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

/**
 * @description find a blog by id
 * @param callback
 */
Blog.prototype.findById = function(callback){
    var blog = {
        id: this.id
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        var returnValue;
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            collection.findOne({_id:ObjectId(blog.id)},function(err, blog){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                if(blog){
                    blog.created_time = TimeManage.formatTime(blog.created_time);
                    returnValue = blog;
                    return callback(null, returnValue);
                }else {
                    return callback(null, {title:'test',content:'content',created_time:'time',userName: 'name'});
                }
            })
        });
    })
}

/**
 * @description update a blog by id
 * @param callback
 */
Blog.prototype.update = function(callback){
    var blogId = this.id;
    var blog = {
        title: this.title,
        content: this.content,
        updated_time: (new Date()).getTime()
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: ObjectId(blogId)}, {
                $set:{'title':blog.title,'content':blog.content,'updated_time': blog.updated_time}
            }, function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            })
        })
    })
};

/**
 * @description delete blog by id, if can find a blog by id, delete id.
 * @param callback
 */
Blog.prototype.deleteById = function(callback){
    var blogId = this.id;
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        db.collection('blog', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            collection.findOne({_id: ObjectId(blogId)}, function(err, blog){
                if(err){
                    mongodb.close();
                    return callback(err);
                };
                if(blog){
                    collection.remove({_id: ObjectId(blogId)}, 1, function(err, blogT){
                        mongodb.close();
                        if(err){
                            return callback(err);
                        };
                        return callback(null);
                    })
                }else {
                    mongodb.close();
                    return callback(null);
                }
            })
        })
    })
}