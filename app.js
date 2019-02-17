var createError = require('http-errors');
var express = require('express');

var bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var downloadRouter = require('./routes/get_val');
//var groceryRouter = require('./routes/get_groc');

var app = express();

// Body Parser Middleware

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())



// Routers
app.use('/', indexRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/get_val', downloadRouter);
//app.use('/api/get_groc', groceryRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


