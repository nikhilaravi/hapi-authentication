#3rd party authentication using hapi plugins
* Bell to do the OAuth authenitcation with the provider
* hapi-auth-cookie to save the user’s profile information into an encrypted cookie which can be used throughout the rest of the application to determine the authentication status.

##Endpoints

* / - can be accessed with or without authentication
* /login  - authenticates with 3rd party provider
* /account - can only be accessed if authenticated
* /logout - clears session authentication


##Plugins
* Plugins can be added using

``` js
server.register([array of plugin objects], callback)
// e.g.
server.register([require('bell'), require('somePlugin'))], callback)

```
* Each object in the array must implement a 'register function' which will be called and supplied the current hapi server object (if using npm plugins they already have a register function)
* Once all the plugins have been registered, the callback will execute.

##Bell

* Bell handles all web flow required by OAuth for 3rd party authentication and will only call the associated hapi handler function when the user has been successfully authenticated by the provider.
* bell does not have any way of storing a user session so once the single request has been authenticated by the provider, the authentication will be lost for follow up request.

We need a way to create a secure cookie that holds the OAuth session information and can be used to authenticate future requests in the application.

[OAuth Web Application flow with Github](https://developer.github.com/v3/oauth/)

##Hapi Auth Cookie
* hapi-auth-cookie provides an api to get and set encrypted cookies
* It extends the hapi request object by adding a session object (`request.auth.session`) and associated methods

```js
request.auth.session.set(someCredentials); //setting secure cookie using credentials returned from 3rd party authentication
request.auth.session.clear(); //removing secure cookie

```

##Authentication strategies

Both bell and hapi-auth-cookie register new schemes using the hapi method server.auth.scheme. This creates the ‘bell’ and ‘cookie’ schemes which we can use to create authentication strategies.

A strategy is a pre-configured instance of a scheme with an associated name.

We need to register the schemes with the hapi server (as mentioned above) before registering strategies that use it.

```js
server.auth.strategy('some_strategy_name', 'predefined_scheme_name', options_object);

```

To set up the 'github' strategy, we give it the name "github", set the scheme to "bell" and pass in an options object to configure its behaviour:

```js
var authOptions = {
    provider: 'github',
    password: 'github-encryption-password', //Password used for encryption - can be any string
    clientId: 'xxxxxxxxx',//'YourAppId',
    clientSecret: 'xxxxxxxxxx',//'YourAppSecret',
    //can set this up by logging in to Github and creating a new application
    isSecure: false //means authentication can occur over http
};
```

* The parameter isSecure defaults to true and this means that this cookie will only be transmitted over HTTPS connections.

### Config parameter

* Parameter of the router
* can set authentication using the `config.auth` property

``` js

server.route({
  method: 'GET',
  path: "/",
  config: {
    auth: {
      mode: "required",
      strategy: "github"
    }
  }
})

```

#### Auth properties

If a route has the auth property set to one of the authentication strategies. The handler function is executed only if the authentication is successful.

Auth setup has a mode property. which can be one of
* ‘required’ - the request must have valid authentication.
* ‘optional’ - the request doesn’t need to have authentication, but if it does, it must be valid (e.g. display the home page differently if logged in)
* ‘try’ - same as ‘optional’ but the authentication doesn’t have to be valid.
