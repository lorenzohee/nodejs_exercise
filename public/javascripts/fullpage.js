/**
 * Created by Lorenzo on 2016/2/4.
 */
$(document).ready(function(){
    var $mlNav = $('.ml-nav');
    $('#dowebok').fullpage({
        verticalCentered: !1,
        navigation: !0,
        onLeave: function(index, nextIndex, direction){
            if(index == 2 && direction == 'up'){
                $mlNav.animate({
                    top: 80
                }, 680);
            } else if(index == 1 && direction == 'down') {
                $mlNav.animate({
                    top: 0
                }, 400);
            } else if(index == 3 && direction == 'up') {
                $mlNav.animate({
                    top: 0
                }, 500);
            } else {
                $mlNav.animate({
                    top: -66
                }, 400);
            }
        }
    });
});