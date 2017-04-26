$(function () {

    /*=======方法调用==========*/

    init();
    /*=======方法定义==========*/

    /*初始化*/
    function init() {
        getCategoryTitle();
        // categoryTitleClick
    }

    /* 取到分类标题*/
    function getCategoryTitle() {
        $.get("http://139.199.157.195:9090/api/getcategorytitle", function (res) {
            var html = template("categoryBox", res);
            $("#accordion").html(html);
           

            $.each($("#accordion a"), function (i, v) {
                var that = v;
                titleId = $(that).data("titleid");
                $.get("http://139.199.157.195:9090/api/getcategory?titleid=" + titleId, function (data) {
                    var html = template("categoryListTpl", data);
                    var $ph = $(that).parent().parent();
                    $ph.next().find(".row").html(html);
                });
            });
        });
    }

    function categoryTitleClick() {
        $("#accordion a").on("click", function (e) {
            // console.log(this==e.currentTarget);
            //    console.log($(this).attr("data-titleid"));
            var titleId = $(this).data("titleid");
            var that = this;
            $.get("http://139.199.157.195:9090/api/getcategory?titleid=" + titleId, function (res) {
                // console.table(res.result);
                var html = template("categoryListTpl", res);
                // $()
                /* 获取到a标签的父元素 panel-heading */
                // console.log(that);
                // $(that).parent(".panel-heading");
                var $ph = $(that).parent().parent();
                // 去到 panel-heading 的兄弟
                console.log($ph.next());
                $ph.next().find(".row").html(html);
            });
        });
    }

});