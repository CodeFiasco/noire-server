/**
 * Routes restricted to authenticated users, possibly to implement as SPA
 */
'use strict';

var Package = require('../../package.json');

exports.register = function(server, options, next) {

    server.route({
        path: '/admin',
        method: 'GET',
        config: {
            description: 'the server admin section of the web site',
            handler: function(request, reply) {

                var html = '<div>Admin Section</div>';
                return reply(html);
            }
        }
    });

    server.route({
        path: '/account',
        method: 'GET',
        config: {
            description: 'the user account page',
            handler: function(request, reply) {

                var html = '<div>User Account Page</div>';
                return reply(html);
            }
        }
    });

    return next();

};

exports.register.attributes = {
    name: 'restricted',
    pkg: Package
};