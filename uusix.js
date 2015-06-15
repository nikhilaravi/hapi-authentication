var Hapi = require("hapi");
var Bell = require('bell');
var hapicookie = require('hapi-auth-cookie');

var server = new Hapi.Server("127.0.0.1", 8000);


server.pack.register(Bell, function (err) {
	if (err) throw err;
		
		server.auth.strategy("google", 'bell', {
	        provider: 'google', // name of the provider (e.g. 'google'),
	        password: "12345678", //password (a random number used for cookie encryption)
					// OAuth client credentials (obtained from the provider on registering your application)
					clientId: "604932332741-ogdj0cn9jj7kn95qkohmn5gmffr9tj0v.apps.googleusercontent.com",
					clientSecret: "aiWSvWs0PHPnNUO1INPs9acd",
	        isSecure: false     // IF not using HTTPS this must be false
	    });

server.route({
    method: 'GET',
    path: '/google/login',
    config: {
        // Use the 'session' auth strategy to only allow users
        // with a session to use this route.
        auth: 'google',
        handler: function handler(request, reply) {
            return reply('My Account');
        }
    }
	});


    server.start(function (err) {

        console.log('Server started at:', server.info.uri);
    });
});

