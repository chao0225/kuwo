$(function(){
  $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
  $.ajax({//异步
    url:"header.html",
    type:"get",
    success:function(res){
      //res->html片段
      $(res).replaceAll("#header");
    }
  })
})