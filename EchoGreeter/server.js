//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

var express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = process.env.PORT || 1337;

app.get('/', function (req, res) {
	res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
	res.send('Got a POST request');
});

// Creates the website server on the port #
server.listen(port, function () {
	var host = server.address().address;
	console.log('Server listening at http://%s:%s', host, port);
});