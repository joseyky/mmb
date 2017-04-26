'use strict';
$(function () {
    // ==========方法调用==========
    Init();
    // ==========方法定义==========
    function Init() {
        getInlanddiscount();
    }
    var Data = {};
    //加载商品折扣数据
    function getInlanddiscount() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getinlanddiscount",
            success: function (data) {
                Data = data;
                rander();
            }
        });
    }

    //数据渲染
    function rander() {
        var newData = {result:[]};
        // console.log(Data.result.length);
        var leng = 8;
        if(Data.result.length<=8){
            leng = Data.result.length;
        }
        for(var i=0;i<leng;i++){
            newData.result.push(Data.result.shift());
        }
        var html = template("inlandTpl", newData);
        $("#inlanddiscount ul").append(html);
    }

    $(window).scroll(function(){
        if(Data.result.length==0){
            return;
        }
        var height = $("#inlanddiscount ul").height()+$("header").height()+$("footer").height()-$(document.body).height();
        var disHeight =height - $(document.body).scrollTop();
        if(disHeight<50){
            // console.log("加载数据");
            rander();
        }
    });
});