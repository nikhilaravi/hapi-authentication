var Hapi = require('hapi');
var server = new Hapi.Server({ debug: { request: ['error'] } });
var Bell = require('bell');
var AuthCookie = require('hapi-auth-cookie');

server.connection({ port: 9001 });

server.register([Bell, AuthCookie], function (err) {

    if (err) {
        console.error(err);
        return process.exit(1);
    }


    var authCookieOptions = {
    password: 'cookie-encryption-password', //Password used for encryption
    cookie: 'sitepoint-auth', // Name of cookie to set
    isSecure: false
    };

    server.auth.strategy('site-point-cookie', 'cookie', authCookieOptions);

    var bellAuthOptions = {
        provider: 'github',
        password: 'github-encryption-password', //Password used for encryption
        clientId: '9fdbf4d83aea78f4aab4',//'YourAppId',
        clientSecret: 'f432895e56c5bac1b4d89fcd3bf59e57ff0e3ae9',//'YourAppSecret',
        isSecure: "false"
    };

    server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

    server.auth.default('site-point-cookie');

    server.route([{
          method: ['GET', 'POST'],
          path: '/login',
          config: {
          auth: 'github-oauth',
          handler: function (request, reply) {
            console.log(request.auth.credentials);
            if (request.auth.isAuthenticated) {

                request.auth.session.set(request.auth.credentials);
                return reply('Hello ' + request.auth.credentials.profile.displayName);
            }

            reply('Not logged in...').code(401);
          }
          }
        }, {
          method: 'GET',
          path: '/account',
          config: {
            handler: function (request, reply) {

                reply(request.auth.credentials.profile);
            }
          }
        }, {
          method: 'GET',
          path: '/',
          config: {
            auth: {
                mode: 'optional'
            },
            handler: function (request, reply) {

                if (request.auth.isAuthenticated) {
                    return reply('welcome back ' + request.auth.credentials.profile.displayName);
                }

                reply('hello stranger!');
            }
          }
        }, {
          method: 'GET',
          path: '/logout',
          config: {
              auth: false,
              handler: function (request, reply) {

                  request.auth.session.clear();
                  reply.redirect('/');
              }
          }
        }
    ]);
    server.start(function (err) {

        if (err) {
            console.error(err);
            return process.exit(1);
        }

       console.log('Server started at %s', server.info.uri);
    });
});
