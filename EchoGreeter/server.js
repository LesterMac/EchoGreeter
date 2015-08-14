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
	res.send('SAY: Alexa, ask greeter to turn on coffee pot.');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
	res.send('Got a POST request');
});

// Handles the route for echo apis
app.post('/api/echo', function (req, res) {
	console.log("received echo request");
	var requestBody = "";
	
	// Will accumulate the data
	req.on('data', function (data) {
		requestBody += data;
	});
	
	// Called when all data has been accumulated
	req.on('end', function () {
		var responseBody = {};
		console.log(requestBody);
		console.log(JSON.stringify(requestBody));
		
		// parsing the requestBody for information
		var jsonData = JSON.parse(requestBody);
		if (jsonData.request.type == "LaunchRequest") {
			// crafting a response
			responseBody = {
				"version": "0.1",
				"response": {
					"outputSpeech": {
						"type": "PlainText",
						"text": "Welcome to Echo Sample! Please say a command"
					},
					"card": {
						"type": "Simple",
						"title": "Opened",
						"content": "You started the Node.js Echo API Sample"
					},
					"reprompt": {
						"outputSpeech": {
							"type": "PlainText",
							"text": "Say a command"
						}
					},
					"shouldEndSession": false
				}
			};
		}
		else if (jsonData.request.type == "IntentRequest") {
			var outputSpeechText = "";
			var cardContent = "";
			if (jsonData.request.intent.name == "TurnOn") {
				// The Intent "TurnOn" was successfully called
				outputSpeechText = "Congrats! You asked to turn on " + jsonData.request.intent.slots.Device.value + " but it was not implemented";
				cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
			}
			else if (jsonData.request.intent.name == "TurnOff") {
				// The Intent "TurnOff" was successfully called
				outputSpeechText = "Congrats! You asked to turn off " + jsonData.request.intent.slots.Device.value + " but it was not implemented";
				cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
			} else {
				outputSpeechText = jsonData.request.intent.name + " not implemented";
				cardContent = "Successfully called " + jsonData.request.intent.name + ", but it's not implemented!";
			}
			responseBody = {
				"version": "0.1",
				"response": {
					"outputSpeech": {
						"type": "PlainText",
						"text": outputSpeechText
					},
					"card": {
						"type": "Simple",
						"title": "Open Smart Hub",
						"content": cardContent
					},
					"shouldEndSession": false
				}
			};
		} else {
			// Not a recognized type
			responseBody = {
				"version": "0.1",
				"response": {
					"outputSpeech": {
						"type": "PlainText",
						"text": "Could not parse data"
					},
					"card": {
						"type": "Simple",
						"title": "Error Parsing",
						"content": JSON.stringify(requestBody)
					},
					"reprompt": {
						"outputSpeech": {
							"type": "PlainText",
							"text": "Say a command"
						}
					},
					"shouldEndSession": false
				}
			};
		}
		
		res.statusCode = 200;
		res.contentType('application/json');
		res.send(responseBody);
	});
});

// Creates the website server on the port #
server.listen(port, function () {
	var host = server.address().address;
	console.log('Server listening at http://%s:%s', host, port);
});