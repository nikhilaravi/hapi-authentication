var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 8000 });

server.register([], function (err) {

    if (err) {
        console.error(err);
        return process.exit(1);
    }

});

server.route(require("./routes_1.js"));

server.start(function (err) {

    if (err) {
        console.error(err);
        return process.exit(1);
    }

   console.log('Server started at %s', server.info.uri);
});
