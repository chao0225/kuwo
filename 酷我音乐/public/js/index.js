
/* 1. 轮播图  ↓*/
window.addEventListener('load', function () {
	var carousels = document.querySelectorAll('.wrap');
	
	for (var i = 0; i < carousels.length; i++) {
		carousel(carousels[i]);
	}
	
});

function carousel(root) {
	var figure = root.querySelector('.ban'),
	nav = root.parentNode.querySelector('.btn'),
	ids = root.querySelector('.dots'),
	images = figure.children,
	n = images.length,
	gap = root.dataset.gap || 0,
	bfc = 'bfc' in root.dataset,
	theta = 2 * Math.PI / n,
	currImage = 0,
	timer=null;
	
	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	window.addEventListener('resize', function () {
		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	});
	
	setupNavigation();
	setupIndecator();
	setAuto();

	function setupCarousel(n, s) {
		var apothem = s / (2 * Math.tan(Math.PI / n));
		
		figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';
		
		for (var i = 0; i < n; i++) {
			images[i].style.padding = gap + 'px';
		}
		for (i = 1; i < n; i++) {
			images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
			images[i].style.transform = 'rotateY(' + i * theta + 'rad)';
		}
		if (bfc) for (i = 0; i < n; i++) {
			images[i].style.backfaceVisibility = 'hidden';
		}
		rotateCarousel(currImage);
	}
	
	function setupNavigation() {
		nav.addEventListener('click', onClick, true);
		
		function onClick(e) {
			e.stopPropagation();
			var t = e.target;
			if (t.tagName.toUpperCase() != 'BUTTON') return;
			
			if (t.classList.contains('next')) {
				currImage++;
			} else {
				currImage--;
			}
			indecatorlight(currImage);
			rotateCarousel(currImage);
		}
	}
	function setupIndecator(){
		let children='';
		//初始化li的class为active, 否则会报错
		children += `<li data-index=0 class='active'></li>`
		for(let i = 1; i<n; i++){
			children += `<li data-index=${i}></li>`;
		}
		ids.innerHTML=children;
		ids.addEventListener('click', onclick, true);
		
		function onclick(e){
			e.stopPropagation();
			let t = e.target;
			if(t.nodeName=='LI'){
				t.parentNode.querySelector('.active').classList.remove('active');
				t.classList.add('active');
				//计算已经转过的整圈, 让banner在本次转动的这一圈中转动, 避免回转多圈
				currImage=Math.floor(currImage/n)*n+t.dataset.index*1;
				rotateCarousel(currImage);
			}
		}
	}
	function indecatorlight(imageIndex){
		let idcIndex=Math.abs(imageIndex%n);
		let curIdc=document.querySelector('.dots>li:nth-child('+(idcIndex+1)+')');
		curIdc.parentNode.querySelector('.active').classList.remove('active');
		curIdc.classList.add('active');
		// console.log(curIdc);
	}
	function rotateCarousel(imageIndex) {
		figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
	}
	
	function setAuto(){
		timer = setInterval(() => {
			currImage++;
			indecatorlight(currImage);
			rotateCarousel(currImage);
		}, 2500);

		//轮播图切换标签页暂停
		document.addEventListener('visibilitychange', onHidden);
		document.addEventListener('visibilitychange', onVisible);

		//鼠标进入停止轮播, 滑出重新开始
		figure.parentNode.parentNode.addEventListener('mouseover', onMouseover, true);
		figure.parentNode.parentNode.addEventListener('mouseout', onMouseout, true);
		// console.log(figure.parentNode.parentNode);
		function onHidden(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if(hide_state){
				clearInterval(timer);
				timer=null;
			}
		}
		function onVisible(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if (!hide_state) {
				timer = setInterval(() => {
					currImage++;
					indecatorlight(currImage);
					rotateCarousel(currImage);
				},2000);
			}
		}
		function onMouseover(e){
			e.stopPropagation();
			
			if(timer){
				clearInterval(timer);
				timer=null;
			}
		}
		function onMouseout(e){
			e.stopPropagation();

			let hide_state = isHidden();
			if(!timer){
				timer=setInterval(() => {
					currImage++;
					indecatorlight(currImage);
					rotateCarousel(currImage);
				}, 2000);
			}
		}
	}
	
}

/*ishidden */
function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
  
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
  
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
      if ((prefixes[i] + 'Hidden') in document)
        return prefixes[i] + 'Hidden';
    }
  
    // otherwise it's not supported
    return null;
  }
  
  function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;
  
    return document[prop];
  }

/* 1. 轮播图  ↑*/


/* 2. 魔方歌手  ↓*/
function Index(node) {
    this.node = node;
    this.init();
};
Index.prototype.init = function () {
    var self = this;
    this.nodes = [];
    Array.prototype.slice.call(self.node, 0).forEach(function (item, index) {
        self.nodes.push(self.update(item));
        self.bindEvents(item, index);
    });
};
Index.prototype.update = function (item) {
    return {
        w: item.offsetWidth,
        h: item.offsetHeight,
        l: item.offsetLeft,
        t: item.offsetTop
    }
};
Index.prototype.bindEvents = function (item, index) {
    var self = this;
    $(item).on('mouseenter', function (e) {
        self.addClass(e, item, 'in', index);
        return false;
        
    })
    $(item).on('mouseleave', function (e) {
        self.addClass(e, item, 'out', index);
        return false;
    })
};
Index.prototype.addClass = function (e, item, state, index) {
    var direction = this.getDirection(e, index);
    var class_suffix = '';
    switch (direction) {
        case 0:
            class_suffix = '-top'; 
            break;
        case 1:
            class_suffix = '-right'; 
            break;
        case 2:
            class_suffix = '-bottom';
            break;
        case 3:
            class_suffix = '-left'; 
            break;
    }
    item.className = '';
    item.classList.add(state + class_suffix);
};
Index.prototype.getDirection = function (e, index) {
    var w = this.nodes[index].w,
        h = this.nodes[index].h,
        x = e.pageX - this.nodes[index].l - w / 2 ,
        y = e.pageY - this.nodes[index].t - h / 2 ;
        // 取到x,y两点坐标
        d=(Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90)+3) % 4;

    
    return d;//d的数值用于判断方向上下左右。
};
new Index($('.wrapper>ul>li'));

/* 2. 魔方歌手  ↑*/

/*3. 首页中魔方歌手中播放按钮 ↓*/

$(".btn-1").hover(function(){
    var $s=$(this)
    if(!$s.is(":animated"))
      $s.animate({left:5},100)
        .animate({left:-10},100)

		.animate({left:5},100)
        .animate({left:-10},100)

		.animate({left:5},100)
        .animate({left:-5},100)
    else $s.stop(true);
  }) 
/* 3. 首页中魔方歌手中播放按钮 ↓*/

/* 4. 播放器  ↓*/
$(()=>{
	//--鼠标划入划出=>隐藏显示-------------------------------------------------------
	let $tri_up = $('.trigger_up'),
			$pb_box = $('.playbar_box'),
			$pbar=$('.playbar_bg'),
			time=null,
		  lock_state=false;
	function pbShow(){
		$tri_up.hide();
		$pbar.css({bottom : 0});
		$pb_box.css({bottom : 0});
	}
	function pbHide(){
		time = setTimeout(()=>{
							$pbar.css({bottom : '-55px'})
							$tri_up.show();
							$pb_box.css({bottom : '-70px'});
						}, 1000);
	}
	
	function mouseEnter(){
		pbShow();
	}
	function mouseLeave(e){
		// console.log(e.target)
		if (!lock_state) {
			pbHide();
		}
	}
	$tri_up.mouseenter(mouseEnter);
	$pb_box.mouseenter(function(){
		clearTimeout(time);
		time = null;
	});
	$pb_box[0].addEventListener('mouseleave', mouseLeave, false);
	//锁定playbar
	$('.pb_lock>a>i').click(function(e){
		e.preventDefault();
		let $tar=$(this);
		$tar.toggleClass('unlock_icon').toggleClass('lock_icon');;
		if($tar.is('.unlock_icon')){
			lock_state=false;
			// $tri_up.mouseenter(mouseEnter);
			// $pb_box.mouseleave(mouseLeave);
			// $pb_box[0].addEventListener('mouseleave', mouseLeave, false);
		}else{
			lock_state=true;
			// $tri_up.off('mouseenter',mouseEnter);
			// $pb_box.off('mouseleave', mouseLeave);
			// $pb_box[0].removeEventListener('mouseleave', mouseLeave, false);
			
		}
		pbShow();
	});
	//--拖动进度条----------------------------------------------------------
	//dot的left值:-5=>520
	//cbar的width:0%=>100%
	let $dot=$('.playbar .pb_dot'),
			$cbar=$('.playbar .pb_cbar'),
			$tbar=$('.playbar .pb_tbar'),
			$box=$dot.parent(),
			canMove=false;
	// console.log($box);
	//改变dot和进度条的left
	function changeLeft(dotLeft){
		$dot.css({
			left: dotLeft
		});
		let cb_width = (dotLeft + 5) * 100 / 525 + "%";
		$cbar.css('width', cb_width);
	}
	function dragBar(){
			$box.mousemove(function (e) {
				if (canMove) {
					let dotLeft = e.pageX - $box.offset().left - $dot.width() / 2;
					// console.log(e.pageX, $box.offset().left, dotLeft);
					if(dotLeft<-5){
						dotLeft=-5;
					}else if(dotLeft>520){
						dotLeft=520;
					}
					changeLeft(dotLeft);
					//防止拖动过快, 鼠标在外部弹起
					window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
			})
	}
	$dot.mousedown(function() {
		canMove=true;
		dragBar();
	});
	$dot.mouseup(function() {
		canMove=false;
		$box.off('mousemove');
	});
	//--点击进度条---------------------------------------------------------------
	$tbar.click(function(e){
		let dotLeft = e.pageX - $box.offset().left - $dot.width() / 2,
				progress = (dotLeft+5)/525;
		changeLeft(dotLeft);
		audio.currentTime=progress*audio.duration;
	})
	//--播放控制---------------------------------------------------------------------
	let audio=document.getElementById('aud'),
			$pause=$('[data-action=pause]'),		//按钮
			$ctime=$('.duration>.ctime'),
			$ttime=$('.duration>.ttime'),
			timer=null;
	$pause.click(function(){
		let $pau_ico=$(this).children('i');
		$pau_ico.toggleClass('pau_icon').toggleClass('play_icon');		//按钮的样式
		console.log($pau_ico.is('.play_icon'));
		if($pau_ico.is('.play_icon')){
			audio.play();
		}else{
			audio.pause();
		}
		changeTime();// 调用时间
	});
	function getSeconds(time){
		return time%60;
	}
	function getMinutes(time){
		return ((time-time%60)/60)%60;
	}
	function getHours(time){
		return Math.floor(time/3600);
	}
	function keepTwo(num){
		return (100+num+"").slice(1);
	}
	function getStrTime(time){
		let curTime =  time | 0,
			  ct_s = getSeconds(curTime),
			  ct_m = getMinutes(curTime),
			  ct_h = getHours(curTime),
			  str = ct_h ? keepTwo(ct_h) + ":" + keepTwo(ct_m) + ":" + keepTwo(ct_s) : keepTwo(ct_m) + ":" + keepTwo(ct_s);
		return str;
	}
	//设置当前时间
	function changeTime(){
		if(timer){ return; } 
		timer=setInterval(()=>{
			// console.log(curTime, str);
			//1.更改当前时间
			$ctime.html(getStrTime(audio.currentTime));
			//2.更改进度条位置
			let dotLeft = (audio.currentTime/audio.duration)*525-5;
			changeLeft(dotLeft);
			//正常播放完毕, 清除定时器并切换按钮class
			//手动暂停, 清除定时器
			if(audio.ended){
				$pause.children('i').toggleClass('pau_icon').toggleClass('play_icon');
				clearInterval(timer);
				timer=null;
			} else if (audio.paused){
				clearInterval(timer);
				timer = null;
			}
		},1000)
	}
	//设置总时间
	console.log(getStrTime(audio.duration));
	//音频元数据已加载完毕
	audio.onloadedmetadata=function(){
		$ttime.html(getStrTime(audio.duration));
	}
});

/*  4. 播放器  ↑*/


/* 5. 客户端下载图片切换 ↓*/

/*  5. 客户端下载图片切换  ↑*/




/*  登录注册 */

function cambiar_login() {
	document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
  document.querySelector('.cont_form_login').style.display = "block";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";               
  setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
	
  setTimeout(function(){    
  document.querySelector('.cont_form_sign_up').style.display = "none";
  },200);  
	}

  function cambiar_sign_up(at) {
	document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
	document.querySelector('.cont_form_sign_up').style.display = "block";
  document.querySelector('.cont_form_login').style.opacity = "0";
	
  setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
  },100);  

  setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
  },400);  

  }    

  function ocultar_login_sign_up() {

  document.querySelector('.cont_forms').className = "cont_forms";  
  document.querySelector('.cont_form_sign_up').style.opacity = "0";               
  document.querySelector('.cont_form_login').style.opacity = "0"; 

  setTimeout(function(){
  document.querySelector('.cont_form_sign_up').style.display = "none";
  document.querySelector('.cont_form_login').style.display = "none";
  },500);  
	
	}

	
	




	/*  歌曲播放 */
	
/*	
	var play_1=document.getElementsByClassName("play_1");
	var audio=document.getElementById("yin_1");
	//淡入淡出效果
	function fn(){
		if(audio.paused){//音频的播放状态
		audio.volume=0;//:当前音频音量 0
		audio.play();  //播放音乐
		var t=setInterval(function(){
			audio.volume+=0.1;  //修改音量
			if(audio.volume>0.9){ //当音量大于0.9
				clearInterval(t);  //停止定时器
			}
		},400)
	}else{
	//:获取当前音量
	var v = audio.volume;
	var t  = setInterval(function(){
		//:修改音量 -0.1
			v -= 0.1;
			if(v>=0){
			audio.volume = v;
			}else{
			clearInterval(t);
			audio.pause();
			}
		//:如果于小于0 停止定时器 暂停播放
	  },200);
	}
}
*/

//  原生 js  控制背景音乐播放
window.onload = function(){
	//var td_3=document.querySelectorAll("table tbody tr td:nth-child(3)");
	var audio=document.getElementsByTagName("audio");
	//console.log(td_3);	
	table.addEventListener("click",function (e){
		var btn=e.target;
		var audio=btn.children[0];		
		//var dname=btn.children[1];				
		//var gname=document.getElementsByClassName("mu_name");   		
		if(btn.nodeName==="TD"){		
			if(audio.paused){//音频的播放状态
				audio.play();  //播放音乐
			}else{
				audio.pause();		
			}			
			//gname.innerHTML=dname.innerHTML;
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




	
	
