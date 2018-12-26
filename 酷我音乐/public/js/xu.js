

/* 置顶 */
$('.js-gotop').on('click', function(event){
					
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $('html').offset().top
    }, 700);
    
    return false;
});

$(window).scroll(function(){

    var $win = $(window);
    if ($win.scrollTop() > 700) {
        $('.js-top').addClass('active');
    } else {
        $('.js-top').removeClass('active');
    }

});



/* 许嵩个人介绍  导航栏切换 */

$("#xin-left>.a100").siblings().hide();
$(".xu-top").on('click',".btn_5",function(e){
    
    $(this).addClass('active');
   $(this).parent().siblings().children().removeClass("active");
   $("." + $(this).attr('data-tab')).show().siblings().hide();
});


//  原生 js  控制背景音乐播放
window.onload = function(){
    var audio=document.getElementsByTagName("audio");	
	table.addEventListener("click",function (e){
        var btn=e.target;
		var audio=btn.children[0];				
		if(btn.hasChildNodes("audio")){            	
            if(audio.paused){//音频的播放状态
                audio.play();  //播放音乐
            }else{
                audio.pause();		
            }					
		}else{
            console.log(124324153415);
        }	
	})	
	//点击另一首歌的时候 其他的都暂停	
	function pauseAll() {						
		var self = this;
		// 给audio  绑定 一次性 暂停函数
		[].forEach.call(audio, function (i) {
			// 将audio中其他的audio全部暂停
			i !== self && i.pause();
		})
	}
	[].forEach.call(audio,function(i){	// 给play事件 永久 绑定暂停函数
		i.addEventListener("play", pauseAll.bind(i));
	})
}



/*
$(()=>{
    var audio=$("audio");
    $("#table").on("click",".td",function(e){
        console.log(11111111);
        var $btn=$(this);     
            if(audio.paused){//音频的播放状态
                audio.get(0).play();  //juery 没有play() 这个方法
            }else{
                audio.get(0).pause();		
            }	    
    })

    function pauseAll() {						
        var self = $(this);
        // 给audio  绑定 一次性 暂停函数
        [].forEach.call(audio, function (i) {
            // 将audio中其他的audio全部暂停
            i !== self && i.pause();
        })
    }
    [].forEach.call(audio,function(i){	// 给play事件 永久 绑定暂停函数
        i.addEventListener("play", pauseAll.bind(i));
    })
})

*/
