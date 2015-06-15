// Defaults of this app.
module.exports = {
    host: "127.0.0.1", //FQN or ip of this box that the server is attached too.
    port: 8000, // Incoming HTTP traffic is assigned to this port.
    hapi: {
        serverOptions: {
            cors: true
        }
    },
    cookie: {
        name: "social-login-with-hapi",
        password: "12345678"
    },
    login: {
        // facebook: {
        //     clientId: "somenumber",
        //     clientSecret: "",
        //     callbackURL: "/auth/facebook/login"
        // },
        // instagram: {
        //     clientId: "somenumber",
        //     clientSecret: "",
        //     callbackURL: "/auth/instagram/callback"
        // },
        // twitter: {
        //     clientId: "somenumber",
        //     clientSecret: "",
        //     callbackURL: "/auth/twitter/callback"
        // },
        google: {
            clientId: "604932332741-ogdj0cn9jj7kn95qkohmn5gmffr9tj0v.apps.googleusercontent.com",
            clientSecret: "aiWSvWs0PHPnNUO1INPs9acd",
            callbackURL: "/bell/door"
        }
    }
};
