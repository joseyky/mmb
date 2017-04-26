$.ajax({
    url: "data.json",
    //   // cache:false,
    //   timeout:5000,
    beforeSend: function () {
        $(".wait").show();
    },
    success: function (res) {
        // $(".wait").hide();
        // alert("加载成功");
        console.log(res);
    },
    error: function (err) {
        console.dir(err);
        alert("加载超时");
    }
});


