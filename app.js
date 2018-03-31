var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var categories = require('./routes/categories');


/* Database Intraction */
//mongoose.connect('mongodb://localhost:27017/nodeapp');
mongoose.connect('mongodb://dbacp:dboptions@clusternode-shard-00-00-brgfz.mongodb.net:27017,clusternode-shard-00-01-brgfz.mongodb.net:27017,clusternode-shard-00-02-brgfz.mongodb.net:27017/nodeapp?ssl=true&replicaSet=ClusterNode-shard-0&authSource=admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'dog&cat', cookie: { maxAge: 60000*60 }, resave: true, saveUninitialized:false}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res, next){
    app.locals.copyright = 'Chandan Pradhan&copy;2018';
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/categories', categories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
