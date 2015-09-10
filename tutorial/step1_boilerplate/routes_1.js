module.exports = [
  {
        method: 'GET',
        path: '/login',
        config: {
            handler: function (request, reply) {
                // send a request to github, ask the user for permission for their information
                reply();
            }
        }
    }, {
        method: 'GET',
        path: '/account',
        config: {
            handler: function (request, reply) {
                // Show the account information if the have logged in already
                reply();
            }
        }
    }, {
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {

                reply();
            }
        }
    }, {
        method: 'GET',
        path: '/logout',
        config: {
            handler: function (request, reply) {
                // Clear the session information and redirects to home page
                reply.redirect("/");
            }
        }
    }
];
