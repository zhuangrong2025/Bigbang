var express = require('express')
var router = express.Router()
var fs=require('fs')  
var path = require('path')


/**
 * generate all pages
 * show on preview frame
 */

//path.resolve 定位到routers目录的上一级目录
var parentPath = path.resolve(__dirname, '..')
var showName = []
router.post('/', function(req, res, next) {
  var pagehtmlNew = JSON.parse(req.body.pagehtmlNew)
  var pagenameNew = JSON.parse(req.body.pagenameNew)
  var pagecssNew = JSON.parse(req.body.pagecssNew)
  showName = pagenameNew
  
  var contentHead = `<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no" />
<title>creator</title>
<link rel="stylesheet" href="../stylesheets/global.css">
<link rel="stylesheet" href="../stylesheets/smui.css">
<link rel="stylesheet" href="../preview/css/output.css">
<script src="../javascripts/jquery-2.1.4.min.js"></script>
</head>
<body>
`
  
  var contentFooter = `
</body>
</html>
`   
  //先删除public/preview文件夹下的所有文件，避免客户端page删除或重命名引起的文件冗余 
  var emptyDir = function(fileUrl){
      var files = fs.readdirSync(fileUrl);//读取该文件夹
      files.forEach(function(file){
          var stats = fs.statSync(fileUrl+'/'+file)
          if(stats.isDirectory()){
              emptyDir(fileUrl+'/'+file)
          }else{
              fs.unlinkSync(fileUrl+'/'+file)
          }
      })
  }
  emptyDir(`${parentPath}/public/preview`) 
  
  //生成html页面
  for (var i=0; i<pagehtmlNew.length; i++){
      var htmlAll2 = contentHead + pagehtmlNew[i] + contentFooter
      fs.writeFile('public/preview/'+ pagenameNew[i] +'.html', htmlAll2, function(err){
        if (err) throw err
      }) 
    }
  
  fs.writeFile('public/preview/css/output.css', pagecssNew,function(err){ if (err) throw err}) 
  res.send({ some: 'json1111' });
})

/* GET preview page. */
router.get('/', function(req, res, next) {
  res.render('preview', { title: showName})
})

module.exports = router
