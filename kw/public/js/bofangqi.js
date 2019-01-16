

$(function(){
    $("<link rel='stylesheet' href='css/bofangqi.css'>").appendTo("head");
    $.ajax({//异步
      url:"bofangqi.html",
      type:"get",
      success:function(res){
        //res->html片段
        $(res).replaceAll("#bofangqi");


            /* 4. 播放器  ↓*/
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
                $pause=$('[data-action=pause]'),
                $ctime=$('.duration>.ctime'),
                $ttime=$('.duration>.ttime'),
                timer=null;
            $pause.click(function(){
            let $pau_ico=$(this).children('i');
            $pau_ico.toggleClass('pau_icon').toggleClass('play_icon');
            console.log($pau_ico.is('.play_icon'));
            if($pau_ico.is('.play_icon')){
                audio.play();
            }else{
                audio.pause();
            }
            changeTime();
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
                /*  4. 播放器  ↑*/
 

        }
    })
})


   

     
        






