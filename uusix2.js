var Hapi = require("hapi");
var Bell = require('bell');
var hapicookie = require('hapi-auth-cookie');
var cookie;

var server = new Hapi.Server("127.0.0.1", 8000);


server.pack.register([Bell, hapicookie], function () { //function (err)
	//if (err) throw err;

        server.auth.strategy('session', 'cookie', {
        cookie: 'sid',
        password: '123456',
        //redirectTo: '/my-account',
       
        });

		server.auth.strategy('google', 'bell', {
	        provider: 'google', 
	        password: "12345678", 
					clientId: "43607964425-k24f6sv3jmchsrcnuuiv5prnoj18adf9.apps.googleusercontent.com",
					clientSecret: "iDmFi5qWl5mVguCqrxo7ebHf",
	        isSecure: false    
	    });

server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: function homeHandler(request, reply) {
            return reply('Home Page');
        }
    }

});

server.route({
    method: 'GET',
    path: '/my-account',
    config: {
        // Use the 'session' auth strategy to only allow users
        // with a session to use this route.
        auth: 'google',
        handler: function myAccountHandler(request, reply) {
            return reply('My Account');
        }
    }
});

server.route({
    method: ['GET', 'POST'],
    path: '/login',
    config: {
        auth: 'google',
        handler: function loginHandler(request, reply) {
            // Here we take the profile that was kindly pulled in
            // by bell and set it to our cookie session.
            // This will set the cookie during the redirect and 
            // log them into your application.
            request.auth.session.set(request.auth.credentials.profile);

            // User is now logged in, redirect them to their account area

            return reply.redirect('/my-account');
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

/*server.route({
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

*/
    server.start(function (err) {

        console.log('Server started at:', server.info.uri);
    });
});

