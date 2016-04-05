/**
 * Created by Lorenzo on 2016/4/1.
 */
var mongodb = require('./db'),
    markdown = require('markdown').markdown;;

function Blog(blog){
    this.title = blog.title;
    this.userId = blog.userId;
    this.content = blog.content;
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
            collection.find().toArray(function(err, blogs){
                mongodb.close();
                if(err) {
                    return callback(err);
                };
                //blogs.forEach(function(blog){
                //    blog.content = markdown.toHtml(blog.content);
                //});
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