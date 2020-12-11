const { ESRCH } = require('constants');
var http = require('http');

//Server creating.
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("data from write");
  res.end('Hello World!');
}).listen(8080);