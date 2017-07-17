var express = require('express')
var router = express.Router()
var fs=require('fs')  

/* GET login page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/login.html')
})

/* post login page. */
router.post('/', function(req, res, next) {
  //获取表单请求
  var linkcolor = req.body.linkcolor || '#00f'
  var fontsize = req.body.fontsize || '13px'
  
  //res.render('index', { title: linkcolor })  
  res.sendFile(__dirname + '/index.html')
  
  //生成scss变量
  var newLinkcolor = sassVariable('color', linkcolor)
  var newFontsize = sassVariable('fontsize', fontsize)  
  var newScss = newLinkcolor + newFontsize
  
  //写入 color.scss
  fs.writeFile('sass/color.scss', newScss ,function(err){  
    if(err){
      throw err
    }
  }) 
  
  //变量组合
  function sassVariable(name, value) {
    return "$" + name + ": " + value + ";"
  }
})

module.exports = router
