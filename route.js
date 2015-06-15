// API Server Endpoints
module.exports =
[
        // {
        //     method: ['GET', 'POST'], // Must handle both GET and POST
        //     path: '/auth/facebook/login',
        //     config: {
        //         auth: 'facebook',
        //         handler: function (request, reply) {
        //
        //             // Perform any account lookup or registration, setup local session,
        //             // and redirect to the application. The third-party credentials are
        //             // stored in request.auth.credentials. Any query parameters from
        //             // the initial request are passed back via request.auth.credentials.query.
        //             //return reply.redirect('/home');
        //             reply([]);
        //         }
        //     }
        // },
        {
            method: ['GET', 'POST'], // Must handle both GET and POST
            path: '/bell/door',
            config: {
                auth: 'google',
                handler: function (request, reply) {

                    // Perform any account lookup or registration, setup local session,
                    // and redirect to the application. The third-party credentials are
                    // stored in request.auth.credentials. Any query parameters from
                    // the initial request are passed back via request.auth.credentials.query.
                    //return reply.redirect('/home');
                    reply("hello authenticated");
                }
            }
        }
];
