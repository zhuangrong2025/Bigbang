var express = require('express')
var router = express.Router()
var fs=require('fs')  
var path = require('path')

/* post theme variables
 * parameter of action
*/
router.post('/', function(req, res, next) {
  var themeName = req.query.name
  var rsCss
  var wsCss = fs.createWriteStream( path.resolve(__dirname, '../sass/_custom.scss'))
  
  //读取主题样式文件，并写入到_custom.scss
  //深蓝色 darkBlue
  if(themeName ==='darkBlue'){
    rsCss = fs.createReadStream( path.resolve(__dirname, '../sass/themes/darkBlue/theme.scss'))
  }
  //亮红色 brightRed
  if(themeName === 'brightRed'){
    rsCss = fs.createReadStream( path.resolve(__dirname, '../sass/themes/brightRed/theme.scss'))
  }
  rsCss.pipe(wsCss)
  
  //url重定向到首页
  res.redirect("http://10.168.1.91:3000")
})


module.exports = router
