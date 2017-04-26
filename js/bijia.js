$(function () {
    init();
    /*=========方法的调用================*/
    /*=========方法的定义================*/

    /*初始化*/
    function init() {
        var productid = getQueryString("productid");
        getProduct(productid);
    }

    /*获取省钱控详情*/
    function getProduct(productid) {
        $.get("http://139.199.157.195:9090/api/getproduct?productid=" + productid, function (res) {
            var html = template("bigBijiaTpl", res);
            $("#bijia").html(html);
            /*ul 已经生成了*/
            getProductCom(productid);
        });
    }

    /*获取网友评价*/
    function getProductCom(productid) {
        $.get("http://139.199.157.195:9090/api/getproductcom?productid=" + productid, function (res) {
            var html = template("comListTpl", res);
            $("#bijia .product-com-list ul").html(html);
        });
    }
})