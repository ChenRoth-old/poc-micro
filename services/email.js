var seneca = require('seneca')();
var mandrill = require('mandrill-api/mandrill'),
		key = 'i52Cb1IzRM2IcNFUpbIpUA',
		mandrill_client = new mandrill.Mandrill(key);

seneca.add('service: email, cmd: send', function(args, cb) { 

	log.info("this works!");
	return cb();

	(function (args.message, res, rej) {
		var message = {
			"html": msg.content,
			"text": msg.content,
			"subject": msg.subject,
			"from_email": "message.from_email@example.com",
			"from_name": "poc",
			"to": [
				{
					"email":msg.email,
					"name": msg.name,
					"type": "to"
				}
			]
		};

		var async = true;
		var ip_pool = "Main Pool";
		var send_at = new Date();
		mandrill_client.messages.send({ "message": message, "async": async },
																	function (result) {
																		console.log(result);
																		res(result);
																	},
																	function (e) {
																		rej(e);
																		// Mandrill returns the error as an object with name and message keys
																		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
																		// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
																	});
	})();

});

seneca.listen();
