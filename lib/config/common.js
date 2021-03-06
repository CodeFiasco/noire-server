// Make sure we process any environment variables first
require('environment');

// debug mode
exports.debug = process.env.DEBUG || false;

// development, staging or production
exports.environment = process.env.NODE_ENV || 'development';

exports.connections = {
    web: {
        host: process.env.WEB_HOST || 'localhost',
        port: process.env.WEB_PORT || 8080,
        enabled: true,
        tls: false
    },
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 8081,
        tls: true,
        enabled: true,
        cors: ['*']
    },
    webTls: {
        host: process.env.WEB_TLS_HOST || 'localhost',
        port: process.env.WEB_TLS_HOST || 8443,
        tls: true,
        enabled: true
    }
};

exports.auth = {
    expiresIn: '8h', // token validity for stateful authentication
    renewIn: '1h', // token validity for stateless renewable authentication
    signupIn: '30d', // token validity for the signup process
    passwordResetIn: '15m', // token validity for password reset
    loginIn: 7 * 24 * 60 * 60, // maximum renewable authentication validity in seconds
    version: 1 // the current token version
};

// paths used by the webpack client build system
exports.build = {
    src: 'client/src',
    dist: 'client/dist',
    views: 'views',
    pages: 'pages',
    scripts: 'js',
    assets: 'assets',
    images: 'img',
    fonts: 'fonts',
    styles: 'css'
};

// url paths used by the noire server
exports.prefixes = {
    api: '/api',
    login: '/login',
    logout: '/logout',
    renew: '/renew',
    signup: '/signup',
    register: '/register',
    passwordReset: '/password-reset',
    passwordUpdate: '/password-update',
    admin: '/admin',
    home: '/home',
    profile: '/profile',
    scripts: '/js',
    images: '/img',
    styles: '/css',
    fonts: '/fonts'
};

// assets cache configuration
exports.cache = {
    views: false, // for dev only
    images: {
        expiresIn: 30 * 1000,
        privacy: 'private'
    },
    scripts: {
        expiresIn: 30 * 1000,
        privacy: 'private'
    },
    styles: {
        expiresIn: 30 * 1000,
        privacy: 'private'
    },
    fonts: {
        expiresIn: 30 * 1000,
        privacy: 'private'
    }
};

// default user avatar image
exports.users = {
    avatar: '/img/avatar.png'
};

// node tls options object, check
// https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
exports.tls = {
    key: './certs/key.pem',
    cert: './certs/cert.pem'
};

// noire redirect plugin
exports.redirect = {
    // Routes that should not be requested via HTTP, redirect them to our TLS connection
    tlsOnly: [exports.prefixes.admin, exports.prefixes.signup, exports.prefixes.register]
};

// noire pagination plugin
exports.pagination = {
    include: ['/api/role', '/api/user', '/api/contact']
    // include: ['*'],
    // exclude: []
};

// noire mailer smtp server settings
exports.smtp = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    test: false
};

// noire server email settings
exports.mail = {
    templates: 'views/email-templates',
    compile: '**/*.hbs',
    address: {
        signup: '"<Academia de Código_>" <helloworld@academiadecodigo.org>',
        passwordReset: '"<Academia de Código_>" <helloworld@academiadecodigo.org>'
    },
    url: {
        signup: '/register',
        passwordReset: '/password-update'
    },
    maximumSignupRequests: 5
};
