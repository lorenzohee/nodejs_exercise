/**
 * Created by Lorenzo on 2016/4/13.
 */
exports.authorize = function(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '请先登录！');
        res.redirect('/login');
    } else {
        next();
    }
}