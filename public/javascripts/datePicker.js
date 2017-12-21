 /*
  * DatePicker
  */
;(function($){
  var DatePicker = function(config){
    var _this = this
			this.config = {
			  cid:"",
        start: 1990,
        end: new Date().getFullYear(),
        swiperParams: {
            direction: 'vertical',
            initialSlide: 0,
            slidesPerView: 7,
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 0,
            onSlideChangeStart: function(){
              var arr = []
              $.each(swipers, function(i, swiper){
                 arr.push(swiper.activeIndex)
              })
              //获取年份值，判断闰年、每个月的天数
              var getYear = $(swipers[0].slides[swipers[0].activeIndex]).text().substring(0,4)
              var getMonth = $(swipers[1].slides[swipers[1].activeIndex]).text()
                  getMonth = getMonth.substring(0, getMonth.length - 1)
              var FedDays = getYear%4==0?29:28
              var monthDays = 0
              var month = getMonth<10?getMonth = '0'+getMonth:getMonth.toString() //注意转为字符串判断
               
              switch(month){
                  case '01':
                  case '03':
                  case '05':
                  case '07':
                  case '08':
                  case '10':
                  case '12': monthDays = 31;break;
                  case '04':
                  case '06':
                  case '09':
                  case '11': monthDays = 30;break;
                  case '02': monthDays = FedDays;break;
              }
              //返回正确的天数，如 2016-2，返回是29天（润年）
              var days = ""
              for(var j=monthDays; j >= 1; j-- ){
                 days += '<div class="swiper-slide">' + j +'日</div>'
              }

              $(swipers[2].slides[1]).parent().html(days)
              swipers[2].update()
                   
              return arr
            }
        },
        onConfirm: function(result){}
		  };
			//融合配置项
			$.extend(this.config,config)
      
      
      
      /*
       * 显示年月日
       */
      //年      
      var year = ""
      for(var i=this.config.start; i <= this.config.end ; i++ ){
        year += '<div class="swiper-slide">' + i +'年</div>'
      }
      $(".sm-picker[data-case=" + this.config.cid + "]").find('.picker-body').append('<div class="swiper-container"><div class="swiper-wrapper">' + year + '</div></div>')
      //月
      var month = ""
      for(var i=12; i >= 1 ; i-- ){
        month += '<div class="swiper-slide">' + i +'月</div>'
      }
      $(".sm-picker[data-case=" + this.config.cid + "]").find('.picker-body').append('<div class="swiper-container"><div class="swiper-wrapper">' + month + '</div></div>')
      //日
      var day = ""
      for(var i=31; i >= 1 ; i-- ){
        day += '<div class="swiper-slide">' + i +'日</div>'
      }
      $(".sm-picker[data-case=" + this.config.cid + "]").find('.picker-body').append('<div class="swiper-container"><div class="swiper-wrapper">' + day + '</div></div>')

      
      //swipers
      var swipers = new Swiper($(".sm-picker[data-case=" + this.config.cid + "]").find('.swiper-container'), this.config.swiperParams)
      
      //默认显示那一条
      swipers[0].slideTo(swipers[0].slides.length-5)
      swipers[1].slideTo(swipers[1].slides.length-5)
      swipers[2].slideTo(swipers[2].slides.length-15)
      
      //弹出
      this.pickerPop(this.config.cid)
      
      //确定
      this.confirm(this.config.cid)
      
      //取消
      this.cancel(this.config.cid)
      
      
	}
  
  DatePicker.prototype = {
    //弹出
		pickerPop:function(cid){
			var _this = this
      $(":not(div)[data-case=" + cid + "]").on("click", function(e){
        $(".sm-mask[data-case=" + cid + "]").fadeIn(200)
        $(".sm-picker[data-case=" + cid + "]").addClass("toggle")
			}) 
    },
    //确定
		confirm:function(cid){
			var _this = this 
      
      $(".sm-picker[data-case=" + cid + "]").find(".picker-header a:eq(1)").on("click", function(e){
        var swiperIndexs = _this.config.swiperParams.onSlideChangeStart()
        var result = ""
        $.each(swiperIndexs, function(i, value){
          result += $(".sm-picker[data-case=" + cid + "]").find(".swiper-container").eq(i).find(".swiper-slide").eq(value).text()
        })
        
        _this.config.onConfirm(result) //传递结果到实例变量中
       
        
        $(".sm-mask[data-case=" + cid + "]").fadeOut(200)
        $(".sm-picker[data-case=" + cid + "]").removeClass("toggle")
			}) 
    },
    //取消
		cancel:function(cid){
			var _this = this
      $(document).on("click", ".cancel, .sm-mask", function(e){
        e.stopPropagation()
        $(".sm-mask[data-case=" + cid + "]").fadeOut(200)
        $(".sm-picker[data-case=" + cid + "]").removeClass("toggle")
			}) 
    }
  }
  
  window.DatePicker = DatePicker
})(jQuery) 

export {
  DatePicker
}
