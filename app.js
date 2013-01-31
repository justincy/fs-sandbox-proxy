var request = require('request'),
    http = require('http'),
    url = require('url');
    
var server = http.createServer(function(req, res){

  res.setHeader('Access-Control-Allow-Origin', 'https://familysearch.org');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type, x-reason');
  res.setHeader('Access-Control-Expose-Headers', 'location, link');

  // Return CORS headers when OPTIONS method is received
  if( req.method === 'OPTIONS' ) {
    console.log( req.headers['access-control-request-headers'] );
    res.statusCode = 200;
    res.end();
  }
  
  // Otherwise, proxy requests to the sandbox
  else {
    var proxyUrl = getProxyUrl(req);
    req.pipe(request(proxyUrl)).pipe(res);
  }

}).listen(process.env.PORT || 80, function(){
  console.log("Web server listening on", server.address().port);
});

function getProxyUrl(req) {
  return 'https://sandbox.familysearch.org' + url.parse(req.url).path;
}