
/* 5. 客户端下载图片切换 ↓*/

document.getElementById("img1").style.zIndex="10";

//1.查找触发事件的元素
//2.绑定事件处理函数
//3.查找要修改的元素
//4.修改元素

//1.查找触发事件的元素
var tabs=document.querySelectorAll("[data-toggle=tab]")
//2.绑定事件处理函数
//for(var i=0;i<tabs.length;i++) var tab=tabs[i]
for(var tab of tabs){
    tab.onmouseover=function(e){
		e.preventDefault();
    var tab=this;
    //3. 查找要修改的元素
    //4.修改元素
    // 清除所有div上的zIndex,恢复默认顺序
    var divs=document.querySelectorAll(
        ".img_3>img"
    );
    
    for(var div of divs) div.style.zIndex="";
    //找到当前tab对应的div，修改其zIndex为10
    //var id=tab.dataset.target; 兼容性问题
    //var id=tab.getAttribute("data-target");
	var id=tab.dataset.target;
    document.querySelector(id).style.zIndex=10;
    }
}   
/*  5. 客户端下载图片切换  ↑*/