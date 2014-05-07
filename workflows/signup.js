module.exports = function(user) { 

	return seneca.
	pact('role: user, cmd: create', user).
	then(function(id) { 

		return seneca.pact('role: user, cmd: send-verification', user);		

	});

};