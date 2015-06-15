/**
 * Dependencies.
 */
var Hapi = require("hapi");
var Bell = require('bell');
var hapicookie = require('hapi-auth-cookie');

var server = new Hapi.Server("127.0.0.1", 8000);

// Register bell with the server

server.pack.register([{ plugin: require('bell') },
    { plugin: require('hapi-auth-cookie') }], function (err) {
	if (err) throw err;
		// Declare an authentication strategy using the bell scheme.
		server.auth.strategy("google", 'bell', {
	        provider: 'google', // name of the provider (e.g. 'google'),
	        password: "12345678", //password (a random number used for cookie encryption)
					// OAuth client credentials (obtained from the provider on registering your application)
					clientId: "604932332741-ogdj0cn9jj7kn95qkohmn5gmffr9tj0v.apps.googleusercontent.com",
					clientSecret: "aiWSvWs0PHPnNUO1INPs9acd",
	        isSecure: false     // Terrible idea but required if not using HTTPS
	    });

		server.auth.strategy('session', 'cookie', {
		    cookie: 'sid',
		    password: '12345678',
		    redirectTo: '/login'
		});

  // Add configured routes to the server routes

	// server.route({
	// 	method: ['GET', 'POST'], // Must handle both GET and POST requests
	// 	path: '/google/login',
	// 	//for requests to this url the user is sent to the google authentication page and the handler function is
	// 	// executed when the user is redirected
	// 	config: {
	// 			auth: 'google',
	// 			handler: function (request, reply) {
	// 					// Perform any account lookup or registration, setup local session,
	// 					// and redirect to the application. The third-party credentials are
	// 					// stored in request.auth.credentials. Any query parameters from
	// 					// the initial request are passed back via request.auth.credentials.query.
	// 					//return reply.redirect('/home');
	// 					reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
	// 			}
	// 	}
	// });
	server.route({
    method: 'GET',
    path: '/google/login',
    config: {
        // Use the 'session' auth strategy to only allow users
        // with a session to use this route.
        auth: 'session',
        handler: function myAccountHandler(request, reply) {
            return reply('My Account');
        }
    }
	});

	server.route({
	    method: ['GET', 'POST'],
	    path: '/login',
	    config: {
	        // Use the 'oauth' auth strategy to allow bell to handle the oauth flow.
	        auth: 'google',
	        handler: function loginHandler(request, reply) {
	            // Here we take the profile that was kindly pulled in
	            // by bell and set it to our cookie session.
	            // This will set the cookie during the redirect and
	            // log them into your application.
	            request.auth.session.set(request.auth.credentials.profile);

	            // User is now logged in, redirect them to their account area
	            return reply.redirect('/google/login');
	        }
	    }
	});

	server.route({
    method: 'GET',
    path: '/logout',
    config: {
        handler: function logoutHandler(request, reply) {
            // Clear the cookie
            request.auth.session.clear();

            return reply.redirect('/');
        }
    }
	});



    // Start server
	server.start(function() {
		console.log("Hapi server started @", server.info.uri);
	});

});
