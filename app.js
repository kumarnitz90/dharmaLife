var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('express-handlebars');
var sess;
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var userSave = require('./routes/userSave');
var dashboard = require('./routes/dashboard');
var auth = require('./routes/auth');
var logout = require('./routes/logout');
var updateUser = require('./routes/updateUser');
var deleteProfile = require('./routes/deleteProfile');
var upload = require('./routes/upload');
var userReg = require('./routes/userReg');


var app = express();

// view engine setup
app.use(session({ secret: 'keyboard cat'}));


// view engine setup
app.engine('hbs',hbs({extname: 'hbs', defaultLayout:'layout', layoutDir: __dirname+'/views/layouts'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/userSave', userSave);
app.use('/dashboard', dashboard);
app.use('/auth', auth);
app.use('/logout', logout);
app.use('/updateUser', updateUser);
app.use('/deleteProfile', deleteProfile);
app.use('/upload', upload);
app.use('/userReg', userReg);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
