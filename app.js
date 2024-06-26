var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
var accountRouter = require('./routes/api/account')
var loginRouter = require('./routes/web/user');
var userRouter = require('./routes/api/user');
//导入express0sessiomn
const session = require('express-session');
const MongoStore = require('connect-mongo')


const config = require('./config/config')
var app = express();

app.use(session({
  name :'sid',
  secret: config.secrext,
  saveUninitialized : false,
  resave : true,
  store : MongoStore.create({
    mongoUrl:`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`
  }),
  cookie:{
    httpOnly : true,
    maxAge : 1000*60*60*24*7
  }
}))





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/', loginRouter);
app.use('/api', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  // 响应404
  res.render('404')
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
