var express = require('express'), app = express.createServer();
var logfmt = require('logfmt');

app.use(logfmt.requestLogger());

app.get('/', function(req, res){
  res.send('Hello World');
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("Listening on " + port);
});


