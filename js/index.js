$(function () {

    /*=========方法的调用==============*/
    init();
    /*=========方法的定义==============*/

    /*  点击更多  */
    function showMore() {
        /*$("#menu>.row>div:nth-child(8)").on("click", function () {
            $("#menu>.row>div:nth-last-child(-n+4)").slideToggle();
        });*/
        // ">div:nth-child(8)",
        /* 事件委托*/
        $("#menu").on("click", ".row>div:nth-child(8)", function () {
            // console.log(111);
            $("#menu>.row>div:nth-last-child(-n+4)").slideToggle();
        });
    }

    /*初始化*/
    function init() {
      

        getIndexMenu();
        getMoneyCtrl();
        // showMore();
    }

    /* 获取首页菜单*/
    function getIndexMenu() {
        // $.ajax({
        //     url: "",
        //     success: function (res) {
        //     }
        // });
        $.get("http://139.199.157.195:9090/api/getindexmenu", function (res) {
            // console.log(res);
            // console.table(res.result);
            var html = template("menuTpl", res);
            $("#menu").html(html);
              showMore();

        });
    }

    /*获取首页折扣列表*/
    function getMoneyCtrl() {
        $.get("http://139.199.157.195:9090/api/getmoneyctrl", function (res) {
            // console.table(res.result);
            var html = template("recommenTpl", res);
            $("#recommen .recommen-list").html(html);
        });
    }


});