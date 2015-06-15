# Authentication
This is a readme designed to inform the FAC5 course about authentication issues associated with web design and development, as well as a working example of authentication that uses Google's API on a HAPI framework.

###Map

  - Reasons to authenticate
  - Authentication schemes
  - Using authentication with HAPI
  
## Reasons to authenticate
Any website or application that restricts access to some portion of its public resources is likely to need a secure form of authentication to identify individual users and control their access to resources stored on the server. In most cases, users are also interested in restricting access to information that they store on the server.

## Authentication schemes
There are two primary authentication schemes, [Open ID](https://en.wikipedia.org/wiki/OpenID) and [OAuth2](https://en.wikipedia.org/wiki/OAuth). Open ID is built on top of the OAuth scheme, allowing trusted entities (websites) to provide assurance of a given person's identity. OAuth works by exchanging tokens between a server and a client. The important idea in OAuth is that a single entity (say, Google) can operate as both an identity authenticator as well as a resource provider. In this way, resource provision is always subsidiary to the initial exchange that confirms the identity of a person (usually via user id/password combinations). Identity confirmation results in the issuing of an access token with specific scope (often limiting access to files, as well as having some form of time limitation) that can be revoked by the issuing authority.

One important thing to note about authentication it is very difficult to improvise or improve upon the standards that are described in OAuth. Furthermore, there are many ways to accidentally render a site insecure through such improvisation. Therefore attempting to create authorisation frameworks, processes and standards from scratch is a good way to compromise your server, users, or both. 

## Using authentication with HAPI

HAPI does not contain authentication as standard, but it does have a number of modules to enable web developers to implement authentication that are well tested and versatile. 

# Social-Login-With-Hapi
The source code provided is an example of how to setup social login functionality into your node application. 

# Dependencies
The backend will use the following technologies and frameworks:

  - [NodeJS](http://nodejs.org/)
  - [Node-HapiJS](https://github.com/hapijs/hapi)
  - [Node-Bell](https://github.com/hapijs/bell)

# Documentation
You can find the blog article related to this code here [social-login-with-hapi](http://blog.itproven.com/technology/nodejs/social-login-with-hapi/).



License
=========
MIT [http://rem.mit-license.org](http://rem.mit-license.org)