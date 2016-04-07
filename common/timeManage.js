/**
 * Created by Lorenzo on 2016/4/6.
 */

exports.formatTime = function(timeT){
    var datetime = new Date(timeT);
    var year = datetime.getFullYear();
    var month = datetime.getMonth()+1;//js从0开始取
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();

    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    if(hour <10){
        hour = "0" + hour;
    }
    if(minutes <10){
        minutes = "0" + minutes;
    }
    if(second <10){
        second = "0" + second ;
    }
    year = year.toString();
    var currentDate = new Date();
    var time = month+"月"+date+"日"+hour+"时"+minutes+"分";
    if(year != currentDate.getFullYear()){
        time = year + '年' + time;
    }
    return time;
}