/**
 * Dependencies.
 */
var Hapi = require("hapi");
var Bell = require('bell');
var hapicookie = require('hapi-auth-cookie');

var server = new Hapi.Server("127.0.0.1", 8000);

//handlers for the endpoints
var logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
};

var myaccount = function(request, reply) {
  return reply("<h1>reached my account<h1>");
};

var home = function(request, reply) {
  reply("<h1>HELLO! this is the home page<h1>");
};

var loggedin = function(request, reply) {
  request.auth.session.set(request.auth.credentials.profile);
  // reply('<pre>'+ JSON.stringify(request.auth.credentials.profile, null, 4) + '</pre>');
  return reply.redirect('/my-account');
};

// register Bell with the server
server.pack.register([{ plugin: require('bell') },
    { plugin: require('hapi-auth-cookie') }], function (err) {
	if (err) throw err;

//authentication strategies
		server.auth.strategy("google", 'bell', {
	        provider: 'google',
	        password: "12345678",
					clientId: "604932332741-ogdj0cn9jj7kn95qkohmn5gmffr9tj0v.apps.googleusercontent.com",
					clientSecret: "aiWSvWs0PHPnNUO1INPs9acd",
	        isSecure: false
	    });

		server.auth.strategy('session', 'cookie', {
		    cookie: 'sid',
		    password: '12345678',
		    redirectTo: '/login',
        isSecure: false,
        clearInvalid: true,
		});

//routes

	server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: home
    }
	});

	server.route({
    method: 'GET',
    path: '/my-account',
    config: {
        auth: 'session',
        handler: myaccount
    }
	});

	server.route({
	    method: ['GET', 'POST'],
	    path: '/login',
	    config: {
	        auth: 'google',
	        handler: loggedin
	        }
	});

	server.route({
    method: 'GET',
    path: '/logout',
    config: {
        handler: logout
        }
	});

    // Start server
	server.start(function() {
		console.log("Hapi server started @", server.info.uri);
	});

});
