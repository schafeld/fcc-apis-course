
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use( function(req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
  }
);

// --> 11)  Mount the body-parser middleware  here
app.use( bodyParser.urlencoded({extended: false}) );

/** 3) Serve an HTML file */
app.get('/', function (req, res) {
   res.sendFile( __dirname + '/views/index.html' );
})

/** 4) Serve static assets  */
app.use( express.static('public') );

/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
 app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json( {"message": "HELLO JSON"});
  } else {
    res.json( {"message": "Hello json"});
  };
})
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time});
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res, next) {
  res.json({"echo": req.params.word});
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', function(req, res, next) {
  res.json({'name': req.query.first + ' ' + req.query.last});
}).post('/name', function(req, res, next) {
  res.json({'name': req.body.first + ' ' + req.body.last});
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
// Method chained above under step 10


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
 