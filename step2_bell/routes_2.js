module.exports = [
  {
      method: "*",
      path: '/login',
      config: {
        auth:'github',
        handler: function (request, reply) {
          console.log(request.auth.credentials);
          if (request.auth.isAuthenticated) {
              request.auth.session.set(request.auth.credentials);
              return reply('Hello');
          }

          reply('You need to Log In!');
        }
      }
    }, {
      method: 'GET',
      path: '/account',
      handler: {
          /// ...//
      }
    }, {
      method: 'GET',
      path: '/',
      handler: {

        ///...///
       }
    }, {
      method: 'GET',
      path: '/logout',
      handler: {
        //// ....////
      }
    }
];
