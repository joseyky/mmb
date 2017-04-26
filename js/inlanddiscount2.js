'use strict';
$(function () {
    // ===============方法的调用==========
    Init();
    // ===============方法的定义==========
    function Init() {
        getInlanddiscount();
    }
    var Data = {};
    // 获取国内折扣数据
    function getInlanddiscount() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getinlanddiscount",
            success: function (data) {
               Data = data;
               rander();
            }
        });
    }

    // 渲染数据
    function rander() {
        var newData = {result:[]};
        var leng = 8;
        if(Data.result.length<=8){
            leng = Data.result.length;
        }
        for(var i=0;i<leng;i++){
            newData.result.push(Data.result.shift());
        }
        var html = template("inlandTpl", newData);
        $("#inlanddiscount ul").append(html);
        flag = false;
    }

    // 加一个控制数据多次加载的开关，这是因为我们的ajax是异步的原因
    var flag = false;
    $().scroll(function(){
        if(Data.result.length==0||flag){
            return;
        }
        var height = $("#inlanddiscount ul").height()+$("#header").height()+$("#footer").height()-$(document.body).height();
        var disHeight = height - $(window).scrollTop();
        if(disHeight<50){
            flag = true;
            rander();
        }
    });
});