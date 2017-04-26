$(function () {

    /*=========方法的调用==========*/
    var leDis = 0;
    // 弹簧距离
    var spring = 30;
    // 已经滑动了的距离
    var alrDis = 0;
    init();
    /*=========方法的定义==========*/

    /*初始化*/
    function init() {
        var titleid = getQueryString("titleid") || 0;
        getBaiCaiJiaTitle(titleid);
        getBaiCaiJiaProduct(titleid);
        clickTitleEvent();
    }

    /*获取标题列表数据*/
    function getBaiCaiJiaTitle(titleid) {
        $(".loader1").show();
        $.get("http://139.199.157.195:9090/api/getbaicaijiatitle", function (res) {
            // 加载标题数据
            var html = template("baicaijiaTitleTmp", res);
            $(".ul-wapper ul").html(html);
            /* 根据标题li的总宽度 设置ul的宽度*/
            //  假如每个li标签的宽度一致
            // var width=$(".ul-wapper ul li").width();
            // var length=$(".ul-wapper ul li").length;
            // var ulWidth=width*length;
            $(".ul-wapper ul li:first").addClass("active");
            // 自己去做静态页面结构尝试一下
            var tmpWidth = 0;
            $.each($(".ul-wapper ul li"), function (i, value) {
                tmpWidth += $(value).width();
            });
            $(".ul-wapper ul").width(tmpWidth);
            swper();


            $(".loader1").hide();
        });
    }

    /*获取白菜价列表*/
    function getBaiCaiJiaProduct(titleid) {
        $(".loader1").show();
        $.get("http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleid, function (res) {
            var html = template("baicaijiaProductTmp", res);
            $(".bcj-list").html(html);
            $(".loader1").hide();
        });
    }

    /* 滑动 */

    // 1 动起来
    // 2 记住上一次的距离
    // 3 加上弹簧距离
    function swper() {
        // 记录开始的位置
        var startX = 0;

        leDis = $(".ul-wapper ul").width() - $(".ul-wapper").width() + 38 + spring;//
        console.log(leDis);
        // 开始滑动
        $(".ul-wapper ul").on("touchstart", function (e) {
            // console.log("start");
            var _touch = e.originalEvent.targetTouches[0];
            startX = _touch.pageX;
        });

        // 正在滑动 
        $(".ul-wapper ul").on("touchmove", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            // var _x = _touch.pageX;
            var dis = _touch.pageX - startX + alrDis;
            // 移动

            // 判断是否大于弹簧距离
            if (dis >= spring) {
                dis = spring;
            }

            // 往左滑动的时候 判断距离
            if (dis < (-leDis)) {
                dis = -leDis;
            }

            $(".ul-wapper ul").css("transition", "none");
            $(".ul-wapper ul").css("transform", "translateX(" + dis + "px)");
            console.clear();
            console.log("move", dis);
        });

        // 结束滑动
        $(".ul-wapper ul").on("touchend", function (e) {
            var _touch = e.originalEvent.changedTouches[0];

            // alrdis是针对第二次拖动以后来使用的
            alrDis = _touch.pageX - startX + alrDis;
            // 判断是否大于弹簧距离
            if (alrDis >= spring) {
                alrDis = 0;
                $(".ul-wapper ul").css("transition", "all .2s");
                $(".ul-wapper ul").css("transform", "translateX(" + 0 + "px)");
            }
            // 往左滑动的时候 判断距离
            if (alrDis < (-leDis)) {
                alrDis = spring - leDis;
                $(".ul-wapper ul").css("transition", "all .2s");
                $(".ul-wapper ul").css("transform", "translateX(" + alrDis + "px)");
            }
            console.log("end", alrDis);
        });
    }


    /* 点击标题事件*/
    function clickTitleEvent() {
        $(".ul-wapper ul").on("click", " li a", function () {
            var titleid = $(this).data("titleid");
            // 渲染选中的标题  
            $(".ul-wapper ul li:eq(" + titleid + ")").addClass("active").siblings().removeClass("active");

            // titleid其实也是当前选中的li标签的索引 tmpWidth其实是ul往左边移动的距离
            var tmpWidth = 0;
            $.each($(".ul-wapper ul li"), function (i, v) {
                if (i < titleid) {
                    tmpWidth += $(v).width();
                }
            });

            if (tmpWidth >= leDis) {
                console.log("不正常");
                tmpWidth = leDis - spring;
            }
            $(".ul-wapper ul").css("transition", "all .2s");
            $(".ul-wapper ul").css("transform", "translateX(" + (-tmpWidth) + "px)");
            alrDis = -tmpWidth;
            getBaiCaiJiaProduct(titleid);
        });
    }


})