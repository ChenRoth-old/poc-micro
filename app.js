seneca = require('seneca')();

var Promise = require('bluebird'),
		util = require('util'),
		express = require('express'),
		bodyParser = require('body-parser');

seneca.client();
seneca.client(10102);
seneca.client(10101);
seneca.pact = Promise.promisify(seneca.act, seneca);
var app = express();
app.use(bodyParser());

var signup = require('./workflows/signup');

app.post('/signup', function(req, res) { 
	
	var user = {
		email: req.body.email,
		name: req.body.name
	};

	signup(user).then(function() { 

		res.send("user has signed up!");		

	}).catch(function(err) {

		res.send(util.format("error signing up: %s", err));	
	});
});

app.listen(3000);