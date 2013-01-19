var request = require('request'),
    http = require('http'),
    url = require('url');
    
var server = http.createServer(function(req, res){

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // Return CORS headers when OPTIONS method is received
  if( request.method === 'OPTIONS' ) {
    res.statusCode = 200;
    res.end();
  }
  
  // Otherwise, proxy requests to the sandbox
  else {
    var proxyUrl = getProxyUrl(req);
    req.pipe(request(proxyUrl)).pipe(res);
  }

}).listen(process.env.PORT || 3000, function(){
  console.log("Web server listening on", server.address().port);
});

function getProxyUrl(req) {
  return 'https://sandbox.familysearch.org' + url.parse(req.url).path;
}