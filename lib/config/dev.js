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
        tls: false,
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
