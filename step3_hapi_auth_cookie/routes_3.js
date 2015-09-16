module.exports = [{
      method: "*",
      path: '/login',
      config: {
        auth:'github',
        handler: function (request, reply) {
          if (request.auth.isAuthenticated) { //isAuthenticated is a boolean 

              request.auth.session.set(request.auth.credentials); //sets the session cookie to equal the credentials
              return reply('Hello');
          }

          reply('You need to Log In');
        }
      }
    }, {
      method: 'GET',
      path: '/account',
      config: {
        //no auth: specified - so defaults to 'session' which checks the session cookie
        handler: function (request, reply) {
            reply(request.auth.credentials.profile);
        }
      }
    }, {
      method: 'GET',
      path: '/',
      config: {
        auth: {
            mode: 'optional' // this means the user doesn't need to be authenticated to reach the home page
        },
        handler: function (request, reply) {

            reply("hello you're home!");
        }
      }
    }, {
      method: 'GET',
      path: '/logout',
      config: {
          auth: false,    // no authentication needed to enter logout page
          handler: function (request, reply) {

              request.auth.session.clear(); //clear the cookie set on login
              reply.redirect('/');
          }
      }
    }
];
