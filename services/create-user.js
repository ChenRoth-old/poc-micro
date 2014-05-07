var seneca = require('seneca')(),
		parambulator  = require('parambulator'),
		util = require('util');

seneca.use('mongo-store', {name: 'users', host: 'localhost'});

seneca.ready(function() {

	var contract = {	
		email: { required$: true },
		name: { required$: true, type$: 'string' }		
	};

	seneca.add('role: user, cmd: create', contract, function(args, cb) {

		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if (!emailRegex.test(args.email))
			throw new Error(util.format("email %s is invalid", args.email));

		var user = seneca.make$('users');
		user.email = args.email;
		user.name = args.name;
		user.save$(function(err, user) { 

			if (err)
				return cb(err, null);

			seneca.log.info("user added: " + user);
			return cb(null, {id: user.id});

		});

	});
});

seneca.listen();
