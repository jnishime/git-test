var http = require('http');
var fs = require('fs');
var settings = require('./settings');
var server = http.createServer();
var msg;

server.on('request', function(req,res){
  switch(req.url){
    case '/react':
      fs.readFile( __dirname + '/react/index.html', 'utf-8', function(err,data){
        if(err){
          res.writeHead(400, {'Content-Type':'text/plain'});
          res.write('not found');
          return res.end();
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
      });
      break;
    case '/ruby':
      msg = 'ruby is comming soon!'
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.write(msg);
      res.end();
      break;
    default:
      res.writeHead(400, {'Content-Type':'text/plain'});
      res.write('not found');
      res.end();
      break;
  }  
});
server.listen(settings.port,settings.host);
console.log('server listening ...');
