var seneca = require('seneca')();
var util = require('util');

seneca.add({cmd: 'log'}, function(args, cb) {
  console.log("logged: " + util.inspect(args));
	
	return cb(null, { result: true});
})


//seneca.listen({type: 'pubsub'});
seneca.listen();
