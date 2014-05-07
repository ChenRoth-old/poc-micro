var seneca = require('seneca')(),
		util = require('util');

seneca.ready(function() {

	var contract = {	
		email: { required$: true },
		name: { required$: true, type$: 'string' }		
	};

	seneca.add('role: user, cmd: send-verification-email', contract, function(args, cb) {

		var message = {
			to: arg.email,
			subject: 'welcome!',
			content: util.format('Hi %s!\nEnjoy your stay', args.name) 
		};

		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if (!emailRegex.test(args.email))
			throw new Error(util.format("email %s is invalid", args.email));

		seneca.act('service:email, cmd:send', message, function(err, result) {

			return cb(err, result);

		});
	});

});

seneca.listen(10102);
