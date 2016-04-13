/**
 * Created by Lorenzo on 2016/4/6.
 */

exports.renderModel = function(req, res, object){
    res.render(object.url, {
        title: object.title,
        collectionObject: object.data,
        currentNav: object.currentNav,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString() });
}