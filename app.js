var express = require('express')
var sassMiddleware = require('node-sass-middleware')
var fs=require('fs')  
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var index = require('./routes/index')
var users = require('./routes/users')
var login = require('./routes/login')

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
  
  //写入variable.scss
  fs.writeFile('sass/_custom.scss', newScss) 
  
  //变量组合
  function sassVariable(name, value) {
    return "$" + name + ": " + value + ";"
  }
    
  res.sendFile(__dirname + '/creator.html')
  
})

/*output and zip 保存页面*/
app.post('/output', function(req, res){
  var pagehtmlNew = req.body.pagehtml
  var pagenameNew = req.body.pagename
  
  for (var i=0;i<pagehtmlNew.length;i++){
    fs.writeFile('output/'+ pagenameNew[i]  +'.html', pagehtmlNew[i]) 
  }
  
  //fs.writeFile('output/output.css', pagehtmlNew) 
  res.sendFile(__dirname + '/routes/output.html')
})

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
