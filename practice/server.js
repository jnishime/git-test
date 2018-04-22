var http = require('http'),
  fs = require('fs'),
  ejs = require('ejs'),
  qs = require('querystring');
var settings = require('./settings');
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/ejs/index.ejs', 'utf-8');
var posts = [];

function renderForm(posts, res){
  var data = ejs.render(template, {
    posts: posts
  });
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write(data);
  res.end();
}
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
    case '/ejs':
      if(req.method === 'POST'){
        req.data = '';
        req.on('readable', function(){
          req.data += req.read();
        });
        req.on('end', function(){
          var query = qs.parse(req.data);
          posts.push(query.name);
          renderForm(posts, res);
        });
      }else{
        renderForm(posts, res);
      }
      break;
    case '/ruby':
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.write('ruby is comming soon');
      res.end();
      break;
    default:
      fs.readFile( __dirname + '/', 'utf-8', function(err,data){
        if(err){
          res.writeHead(400, {'Content-Type':'text/plain'});
          res.write('not found');
          return res.end();
        }
        res.writeHead(400, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
      });
      break;
  }  
});
server.listen(settings.port,settings.host);
console.log('server listening ...');
