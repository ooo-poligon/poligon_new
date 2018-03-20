
//jQuery spotlight plugin by A.R.Shakhmukhametov and A.V.Aksyutenko
$.fn.spotlight=function(opts){
    $(this).on('load', function(){
		
        var pos=$(this).offset();
        var vouale;
        var spotlight;
        var spotimage;
        var spotmask;

        var a = $(this).attr('id')
        var a = $(this).attr('class')
        console.log(a);
        b = a + "_blc closed";
        vouale=document.createElement('div');
        vouale.setAttribute( "class", b );
        $(vouale).css('position','absolute');
        $(vouale).css('top',pos.top);
        $(vouale).css('right',0);
        $(vouale).css('cursor','none');
        $(vouale).css('overflow','hidden');
		
		if ($(window).width() <= '770'){
        $(vouale).width(635);
        $(vouale).height(205);
		}
		else if (($(window).width() <= '1300') && ($(window).width() >= '770')){
        $(vouale).width(695);
        $(vouale).height(265);
		}
		else if (($(window).width() <= '1380') && ($(window).width() >= '1300')){
        $(vouale).width(874);
        $(vouale).height(315);
		}
		else {
			$(vouale).width(1138);
			$(vouale).height(435);
		}
        
        $(vouale).css('background-image','url(images/all_close.png)');
        document.body.appendChild(vouale);
        spotlight=document.createElement("div");
        $(spotlight).width(275);
        $(spotlight).height(275);
        $(spotlight).css('border-radius','50%');
        $(spotlight).css('overflow','hidden');
        $(spotlight).css('display','none');
        $(spotlight).css('position','absolute');
        $(spotlight).css('left',pos.left);
        $(spotlight).css('top',pos.top);
        $(spotlight).css('z-index',500);
        spotimage=document.createElement('img');
        spotimage.setAttribute( "id", "main_img" );
        $(spotimage).attr('src',$(this).attr('src'));
        $(spotimage).css('height',$(this).height());
        $(spotimage).css('width',$(this).width());
        spotmask=document.createElement('img');
        $(spotmask).attr('src','images/spotlight.png');
        $(spotmask).css('position','absolute');
        $(spotmask).css('left',pos.left);
        $(spotmask).css('top',pos.top);
        $(spotmask).css('z-index',550);
        spotlight.appendChild(spotimage);
        vouale.appendChild(spotlight);
        vouale.appendChild(spotmask);
        $('body').mousemove( function(e){
            var x=e.pageX-(pos.left)-75;
            var y=e.pageY-(pos.top)-75;
            $(spotlight).css('display','');
            $(spotlight).css('left',x);
            $(spotlight).css('top',y);
            $(spotmask).css('left',x);
            $(spotmask).css('top',y);
            $(spotimage).css('marginLeft',-x);
            $(spotimage).css('marginTop',-y);
        });




    }).each(function(){
        if(this.complete || (navigator.userAgent.toUpperCase().indexOf('MSIE') && parseInt(navigator.userAgent.toUpperCase().indexOf('MSIE')) == 6))
            $(this).trigger("load");
    });
    ;}




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzcG90bGlnaHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vL2pRdWVyeSBzcG90bGlnaHQgcGx1Z2luIGJ5IEEuUi5TaGFraG11a2hhbWV0b3YgYW5kIEEuVi5Ba3N5dXRlbmtvXG4kLmZuLnNwb3RsaWdodD1mdW5jdGlvbihvcHRzKXtcbiAgICAkKHRoaXMpLmxvYWQoZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgcG9zPSQodGhpcykub2Zmc2V0KCk7XG4gICAgICAgIHZhciB2b3VhbGU7XG4gICAgICAgIHZhciBzcG90bGlnaHQ7XG4gICAgICAgIHZhciBzcG90aW1hZ2U7XG4gICAgICAgIHZhciBzcG90bWFzaztcblxuICAgICAgICB2YXIgYSA9ICQodGhpcykuYXR0cignaWQnKVxuICAgICAgICB2YXIgYSA9ICQodGhpcykuYXR0cignY2xhc3MnKVxuICAgICAgICBjb25zb2xlLmxvZyhhKTtcbiAgICAgICAgYiA9IGEgKyBcIl9ibGMgY2xvc2VkXCI7XG4gICAgICAgIHZvdWFsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdm91YWxlLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBiICk7XG4gICAgICAgICQodm91YWxlKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgJCh2b3VhbGUpLmNzcygndG9wJyxwb3MudG9wKTtcbiAgICAgICAgJCh2b3VhbGUpLmNzcygncmlnaHQnLDApO1xuICAgICAgICAkKHZvdWFsZSkuY3NzKCdjdXJzb3InLCdub25lJyk7XG4gICAgICAgICQodm91YWxlKS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XG4gICAgICAgICQodm91YWxlKS53aWR0aCgxMTM4KTtcbiAgICAgICAgJCh2b3VhbGUpLmhlaWdodCg0MzUpO1xuICAgICAgICAkKHZvdWFsZSkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywndXJsKC4uL2ltYWdlcy9hbGxfY2xvc2UucG5nKScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZvdWFsZSk7XG4gICAgICAgIHNwb3RsaWdodD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAkKHNwb3RsaWdodCkud2lkdGgoMjc1KTtcbiAgICAgICAgJChzcG90bGlnaHQpLmhlaWdodCgyNzUpO1xuICAgICAgICAkKHNwb3RsaWdodCkuY3NzKCdib3JkZXItcmFkaXVzJywnNTAlJyk7XG4gICAgICAgICQoc3BvdGxpZ2h0KS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XG4gICAgICAgICQoc3BvdGxpZ2h0KS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgICAgICQoc3BvdGxpZ2h0KS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgJChzcG90bGlnaHQpLmNzcygnbGVmdCcscG9zLmxlZnQpO1xuICAgICAgICAkKHNwb3RsaWdodCkuY3NzKCd0b3AnLHBvcy50b3ApO1xuICAgICAgICAkKHNwb3RsaWdodCkuY3NzKCd6LWluZGV4Jyw1MDApO1xuICAgICAgICBzcG90aW1hZ2U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHNwb3RpbWFnZS5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgXCJtYWluX2ltZ1wiICk7XG4gICAgICAgICQoc3BvdGltYWdlKS5hdHRyKCdzcmMnLCQodGhpcykuYXR0cignc3JjJykpO1xuICAgICAgICAkKHNwb3RpbWFnZSkuY3NzKCdoZWlnaHQnLCQodGhpcykuaGVpZ2h0KCkpO1xuICAgICAgICAkKHNwb3RpbWFnZSkuY3NzKCd3aWR0aCcsJCh0aGlzKS53aWR0aCgpKTtcbiAgICAgICAgc3BvdG1hc2s9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICQoc3BvdG1hc2spLmF0dHIoJ3NyYycsJy4uL2ltYWdlcy9zcG90bGlnaHQucG5nJyk7XG4gICAgICAgICQoc3BvdG1hc2spLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAkKHNwb3RtYXNrKS5jc3MoJ2xlZnQnLHBvcy5sZWZ0KTtcbiAgICAgICAgJChzcG90bWFzaykuY3NzKCd0b3AnLHBvcy50b3ApO1xuICAgICAgICAkKHNwb3RtYXNrKS5jc3MoJ3otaW5kZXgnLDU1MCk7XG4gICAgICAgIHNwb3RsaWdodC5hcHBlbmRDaGlsZChzcG90aW1hZ2UpO1xuICAgICAgICB2b3VhbGUuYXBwZW5kQ2hpbGQoc3BvdGxpZ2h0KTtcbiAgICAgICAgdm91YWxlLmFwcGVuZENoaWxkKHNwb3RtYXNrKTtcbiAgICAgICAgJCgnYm9keScpLm1vdXNlbW92ZSggZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgeD1lLnBhZ2VYLShwb3MubGVmdCktNzU7XG4gICAgICAgICAgICB2YXIgeT1lLnBhZ2VZLShwb3MudG9wKS03NTtcbiAgICAgICAgICAgICQoc3BvdGxpZ2h0KS5jc3MoJ2Rpc3BsYXknLCcnKTtcbiAgICAgICAgICAgICQoc3BvdGxpZ2h0KS5jc3MoJ2xlZnQnLHgpO1xuICAgICAgICAgICAgJChzcG90bGlnaHQpLmNzcygndG9wJyx5KTtcbiAgICAgICAgICAgICQoc3BvdG1hc2spLmNzcygnbGVmdCcseCk7XG4gICAgICAgICAgICAkKHNwb3RtYXNrKS5jc3MoJ3RvcCcseSk7XG4gICAgICAgICAgICAkKHNwb3RpbWFnZSkuY3NzKCdtYXJnaW5MZWZ0JywteCk7XG4gICAgICAgICAgICAkKHNwb3RpbWFnZSkuY3NzKCdtYXJnaW5Ub3AnLC15KTtcbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICB9KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuY29tcGxldGUgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQudG9VcHBlckNhc2UoKS5pbmRleE9mKCdNU0lFJykgJiYgcGFyc2VJbnQobmF2aWdhdG9yLnVzZXJBZ2VudC50b1VwcGVyQ2FzZSgpLmluZGV4T2YoJ01TSUUnKSkgPT0gNikpXG4gICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJsb2FkXCIpO1xuICAgIH0pO1xuICAgIDt9XG5cblxuXG4vKiBjaGFuZ2Ugb3BhY2l0eSAqL1xuXG4kKCcjY2hvb3NlX2ZpeicpLmZpbmQoJ2xpJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICQoJy5jbG9zZWQnKS5jc3MoJ29wYWNpdHknLCcwLjYnKTtcbn0sIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuY2xvc2VkJykuY3NzKCdvcGFjaXR5JywnMScpO1xufSk7XG5cbiQoJyNsaTRfbWViZWwnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG5cbiAgICQoJyNtYWluX2ltZycpLmF0dHIoJ3NyYycsJy4uL2ltYWdlcy9kb3AvbGk0X21vdG8ucG5nJyk7XG4gICAkKCcuaW1nX2NvbnQnKS5hdHRyKCdzcmMnLCcuLi9pbWFnZXMvZG9wL2xpNF9tb3RvLnBuZycpO1xufSk7XG5cbiJdLCJmaWxlIjoic3BvdGxpZ2h0LmpzIn0=




