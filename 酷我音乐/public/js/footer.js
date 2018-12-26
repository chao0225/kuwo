$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head");
    $.ajax({//异步
      url:"footer.html",
      type:"get",
      success:function(res){
        //res->html片段
        $(res).replaceAll("#footer");
      }
    })
  })