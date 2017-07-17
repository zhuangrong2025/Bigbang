function codeHightLight(val){ 
    
    if(val){
      var code=val; 
    }else{
      return
    }    
    //处理注释：注释替换成 _数字_ 
    var startIdx=endIndex=-1; 
    var at=0; 
    var commentList=[]; 
    while(true){ 
        startIndex=code.indexOf("/*",at); 
        if(startIndex==-1)break; 
        endIndex=code.indexOf("*/",startIndex); 
        if(endIndex==-1)break; 
         
        at=endIndex+2; 
        commentList.push(code.substring(startIndex,at)); 
        code=code.replace(commentList[commentList.length-1],"_"+(commentList.length-1)+"_"); 
    } 
     
    //字符串 
    code=code.replace(/(['"]).*\1/g,function(m){return "<span style=\"color:#060;\">"+m+"</span>"}); 
    //CSS样式值 
    code=code.replace(/:(.+);/g,function(m,n){return ":<span style=\"color:#84F0FF;\">"+n+"</span>;"}); 
    //CSS样式名称 
    code=code.replace(/[{}]/g,function(m){ 
        if(m=="{"){ 
            return "{<span style=\"color:#84F0FF;\">"; 
        }else{ 
            return "</span>}"; 
        } 
    }); 
     
    //注释 
    code=code.replace(/_(\d+)_/g,function(m,n){return "<span style=\"color:#999;\">"+commentList[n]+"</span>"}); 
    //处理\t \制表符 tab,转空格8个
    code=code.replace(/^(\t+)/gm,function(m){ 
        return (new Array(m.length+1)).join("        ");                                     
    }); 
    //处理空格 
    code=code.replace(/^( +)/gm, function(m) { 
        return (new Array(m.length + 1)).join(" "); 
    }); 
    //处理换行 
    code=code.replace(/\r?\n/g,"<br>"); 
    code = code.substring(code.indexOf(">") + 1, code.lastIndexOf("<"))
    code = code + "<br>"
   // $("#pre")[0].innerHTML=code; 
    
    return code
}