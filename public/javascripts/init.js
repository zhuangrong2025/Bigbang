$(function(){
 
  /*dropdown-menu*/
  $(".dropdown > a").each(function(){
    $(this).click(function(){
      $(this).parent().toggleClass("open")
      $(".mask-c").toggle()
    })
  })
  
	//hide mask,hide dropdown
	$(".mask-c, .dropdown-menu li").on("click",function(e){
			e.stopPropagation()
		  $(".dropdown").removeClass("open")
			$(".mask-c").hide()
	})
  
  //choose deivce
  $("#device .dropdown-menu li").on("click",function(){
    var deviceType = $(this).text()
    var deviceWidth = $(this).attr("data-width")
    var deviceHeight = $(this).attr("data-height")
    $("#device a").text(deviceType)
    $("#simulator").css({ "width": deviceWidth })
    $("#simulator").css({ "height": deviceHeight })
  })
  
  //orientation
  $("#orientation").on("click",function(){
    $("#simulator").css({ "width": $("#simulator").height() + 'px' })
    $("#simulator").css({ "height": $("#simulator").width() + 'px' })
  })
  
  
  //modal for theme
	$("#chooseTheme").on("click",function(){
		$("#modal-theme").addClass("in")
		$(".modal-mask").addClass("in")
    $("#theme-tabs li").each(function(){
      if($("#currentTheme").text() == $(this).text()){
        $(this).trigger("click")
      }
    })
    
	})
	$("#modal-page-close, #modal-page-cancel, #modal-icon-show").on("click",function(){
		 $(this).parents('.modal').removeClass("in")
     $(".modal-mask").removeClass("in")
	})
  //theme color tabs
	$("#theme-list li").each(function(index){
     $(this).on("click",function(){
       $(this).addClass("active").siblings().removeClass("active")
       $("div.theme-detail-wrap > div").eq(index).show().siblings().hide()
     })
	})
  
  //theme tabs 
	$("#theme-tabs li").each(function(index){
     $(this).on("click",function(){
       $(this).addClass("active").siblings().removeClass("active")
       $("div.modal-content > .theme-box").eq(index).show().siblings().hide()
     })
	})
    
  /* theme modal close or cancel
   * The color receive from the server 
   */
	$("#modal-theme-cancel,#modal-theme-close").on("click",function(){
		 $(this).parents('.modal').removeClass("in")
     $(".modal-mask").removeClass("in")
     $.ajax({
        type: 'post',
        url: 'http://10.168.1.91:3000/cancelTheme',
        dataType: 'json',
        success: function(data){
          //遍历服务器端返回的对象，设置vm.themes对应的值
          $.each(data, function(key, value){
              vm.themes[key] = value
              $('[name='+ key +']').css("background-color",value)
          })
          
        }
     })
	})
  /* theme Restore defaults */
	$("[data-theme=default]").on("click",function(){
     $.ajax({
        type: 'post',
        url: 'http://10.168.1.91:3000/restoreDefaults',
        dataType: 'json',
        success: function(data){
          //Receive data returned by the server
          $.each(data, function(key, value){
              vm.themes[key] = value
              $('[name='+ key +']').css("background-color",value)
          })
          $(window).attr('location','http://10.168.1.91:3000/')
        }
     })
	})
    
  //tinycolorPicker
  getColor()
  $(".theme-detail-wrap dl").each(function(){
    $(this).find('input').eq(0).keyup(function(){
      getColor()
    })
  })
  function getColor(){
    $('.color').colorPicker({
      renderCallback: function($elm, toggled) {
        $elm.prev().focus()
        var cls = $elm.attr("name")
        vm.themes[cls] = $elm.val()
      }
    })
  }
  
  
	$(".pv-mask").on("click",function(){
     console.log("mask")
	})
  
	
})
 //preview pop pagination
function previewPrev(){
  window.history.go(-1)
}
function previewNext(){
  window.history.go(1)
}
function previewClose(){
  vm.isPreview = false
  $(".navbar a").toggleClass("active")
  $("#form-cvs input[type=hidden]").remove()
}
