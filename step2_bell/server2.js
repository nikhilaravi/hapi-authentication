var Hapi = require('hapi');
var server = new Hapi.Server();

var Bell = require('bell');

server.connection({ port: 8000 });

server.register([Bell], function (err) {
  //register the plugins with the server

    if (err) {
        console.error(err);
        return process.exit(1);
    }

    var authOptions = {
        provider: 'github',
        password: 'github-encryption-password', //Password used for encryption
        clientId: '9fdbf4d83aea78f4aab4',//'YourAppId',
        clientSecret: 'f432895e56c5bac1b4d89fcd3bf59e57ff0e3ae9',//'YourAppSecret',
        isSecure: false //means authentication can occur over http
    };

   // server.auth.strategy('strategy_name', 'scheme_name', options_object);

    server.auth.strategy('github', 'bell', authOptions);

});

server.route(require("./routes_2.js"));

server.start(function (err) {

    if (err) {
        console.error(err);
        return process.exit(1);
    }

   console.log('Server started at %s', server.info.uri);
});
