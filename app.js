var express = require('express')
var sassMiddleware = require('node-sass-middleware')
var fs=require('fs')  
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var archiver = require('archiver')
var beautify_html = require('js-beautify').html
var beautify_css = require('js-beautify').css

var index = require('./routes/index')
var users = require('./routes/users')
var login = require('./routes/login')
var preview = require('./routes/preview')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())



//user node-sass-middleware
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public/stylesheets',  //path of output
    prefix:  '/stylesheets',  // the sass middleware will look for the file /sass/app.scss rather than /sass/stylesheets/app.scss.
    debug: true,
  })
)

app.use(express.static(path.join(__dirname, 'public')))

/*=============================
  首页creator.html
  =============================*/

app.get('/', function(req, res){
   res.sendFile(__dirname + '/creator.html')
})

/*custom theme color*/
app.post('/', function(req, res, next) {
  //获取表单请求，修改颜色变量
  var primaryNew = req.body.primary || '#008AD5'
  var warningNew = req.body.warning || '#E64340'
  
  //生成scss变量
  var newPrimary = sassVariable('brand-primary', primaryNew)
  var newWarning = sassVariable('brand-warning', warningNew)  
  var newScss = newPrimary + newWarning
  
  //写入_custom.scss
  fs.writeFile('sass/_custom.scss', newScss) 
  
  //变量组合
  function sassVariable(name, value) {
    return "$" + name + ": " + value + ";"
  }
    
  res.sendFile(__dirname + '/creator.html')
  
})

/*output 保存页面html到服务器  压缩zip*/
app.post('/output', function(req, res){
  var pagehtmlNew = req.body.pagehtml
  var pagenameNew = req.body.pagename
  var pagecssNew = req.body.pagecss
  var contentHead = `<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no" />
<title>creator</title>
<link rel="stylesheet" href="global.css">
<link rel="stylesheet" href="smui.css">
<link rel="stylesheet" href="css/output.css">
<script src="jquery-2.1.4.min.js"></script>
</head>
<body>
`
  
  var contentFooter = `
</body>
</html>
`  
  //先删除output文件夹下的所有文件，避免客户端page删除或重命名引起的文件冗余 
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
  emptyDir(__dirname + '/output') 
  
  //保存html 
  if(typeof (pagehtmlNew) == 'string'){
    var htmlAll = contentHead + pagehtmlNew + contentFooter
    //js-beautify
    htmlAll = beautify_html(htmlAll, { "indent_size": 2,
                                           "extra_liners": [],
                                           "unformatted": ['span', 'label', 'b', 'strong', 'h1', 'h3', 'pre']  //unformatted (defaults to inline tags),if tag not in [] ,so it is not inline, example "a"
                                         })
        
    fs.writeFile('output/'+ pagenameNew  +'.html', htmlAll,function(err){
        if (err) throw err
    })
    
  }else{
    for (var i=0; i<pagehtmlNew.length; i++){
      var htmlAll2 = contentHead + pagehtmlNew[i] + contentFooter
      //js-beautify
      htmlAll2 = beautify_html(htmlAll2, { "indent_size": 2,
                                         "extra_liners": [],
                                         "unformatted": ['span', 'label', 'b', 'strong', 'h1', 'h3', 'pre']  
                                       })
      //相同name的page，重命名
      if (pagenameNew.indexOf(pagenameNew[i]) != i) {
        pagenameNew[i] = pagenameNew[i] + "(" + (i + 1) + ")"
      }
      
      fs.writeFile('output/'+ pagenameNew[i] +'.html', htmlAll2, function(err){
        if (err) throw err
      }) 
    }
  
  }
  //js-beautify
  pagecssNew = beautify_css(pagecssNew, { "indent_size": 2, "newline_between_rules": false})
  fs.writeFile('output/css/output.css', pagecssNew,function(err){ if (err) throw err}) 
  
  
  
  //zip
  var output = fs.createWriteStream(__dirname + '/smui-www.zip')
  var archive = archiver('zip', {
      zlib: { level: 9 } 
  })
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })
  archive.on('error', function(err) {
    throw err
  })   
  archive.pipe(output)
  
  var smuiCss = __dirname + '/public/stylesheets/smui.css'
  var globalCss = __dirname + '/public/stylesheets/global.css'
  var jquery = __dirname + '/public/javascripts/jquery-2.1.4.min.js'
  var readme = __dirname + '/public/README.txt'
  archive.append(fs.createReadStream(smuiCss), { name: 'smui.css' })
  archive.append(fs.createReadStream(globalCss), { name: 'global.css' })
  archive.append(fs.createReadStream(jquery), { name: 'jquery-2.1.4.min.js' })
  archive.append(fs.createReadStream(readme), { name: 'README.txt' })
  archive.directory('output/', false)
  archive.finalize()
  
  res.sendFile(__dirname + '/routes/output.html')
})

//download zip
app.get('/download', function(req, res){
  var file = __dirname + '/smui-www.zip';
  res.download(file); // Set disposition and send it.
});

app.get('/', function(req, res){
   res.sendFile(__dirname + '/creator.html')
})

app.use('/preview', preview)
app.use('/login', login)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
