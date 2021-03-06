const Hapi = require('hapi');
const Lab = require('lab');
const Joi = require('joi');
const Errors = require('plugins/route-errors');
const Assets = require('plugins/assets');
const Auth = require('test/fixtures/auth-plugin');
const Logger = require('test/fixtures/logger-plugin');

const { beforeEach, describe, expect, it } = (exports.lab = Lab.script());

describe('Plugin: route-errors', () => {
    let server;

    beforeEach(async () => {
        server = Hapi.server();
        server.register(Logger);
        await server.register(Errors);
    });

    it('should not redirect on valid route with no errors', async () => {
        // setup
        const fakeResult = 'ok';
        const fakeRoute = { path: '/', method: 'GET', handler: () => fakeResult };
        server.route(fakeRoute);

        // exercise
        const response = await server.inject(fakeRoute.path);

        // verify
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equals(fakeResult);
    });

    it('should redirect 404 not found errors to root', async () => {
        // exercise
        const response = await server.inject('/invalid-route');

        // validate
        expect(response.statusCode).to.equal(301);
        expect(response.statusMessage).to.equal('Moved Permanently');
        expect(response.headers.location).to.equal('/');
    });

    it('should not redirect assets', async () => {
        // setup
        await server.register(Assets);

        // exercise
        const response = await server.inject('/img/invalid');

        // validate
        expect(response.statusCode).to.equal(404);
        expect(response.statusMessage).to.equal('Not Found');
    });

    it('should return 400 malformed data on post errors', async () => {
        // setup
        const fakeRoute = {
            path: '/',
            method: 'POST',
            handler: () => null,
            options: {
                validate: {
                    payload: {
                        arg: Joi.string().required()
                    }
                }
            }
        };
        server.route(fakeRoute);

        // exercise
        const response = await server.inject({ method: 'POST', url: fakeRoute.path });

        // validate
        expect(response.statusCode).to.equal(400);
        expect(response.statusMessage).to.equal('Bad Request');
        expect(response.result.message).to.equal('Malformed Data Entered');
    });

    it('should redirect on insufficient scope', async () => {
        // setup
        const fakeRoute = {
            path: '/',
            method: 'GET',
            handler: () => null,
            options: {
                auth: {
                    scope: 'admin'
                }
            }
        };
        await server.register(Auth);
        server.route(fakeRoute);

        // exercise
        const response = await server.inject({
            method: 'GET',
            url: fakeRoute.path,
            auth: {
                credentials: { scope: 'user' },
                strategy: 'default'
            }
        });

        // validate
        expect(response.statusCode).to.equal(302);
        expect(response.statusMessage).to.equal('Found');
        expect(response.headers.location).to.equal('/');
    });

    it('should not redirect on insufficient scope when redirect set to false', async () => {
        // setup
        const fakeRoute = {
            path: '/',
            method: 'GET',
            handler: () => null,
            options: {
                auth: {
                    scope: 'admin',
                    strategy: 'default'
                },
                app: {
                    redirect: false
                }
            }
        };
        await server.register(Auth);
        server.route(fakeRoute);

        // exercise
        const response = await server.inject({
            method: 'GET',
            url: fakeRoute.path,
            auth: {
                credentials: { scope: 'user' },
                strategy: 'default'
            }
        });

        // validate
        expect(response.statusCode).to.equal(403);
        expect(response.statusMessage).to.equal('Forbidden');
    });

    it('should not redirect on failed authentication', async flags => {
        // cleanup
        flags.onCleanup = function() {
            Auth.authenticate = true;
        };

        // setup
        Auth.authenticate = false;

        await server.register(Auth);
        const fakeRoute = {
            path: '/',
            method: 'GET',
            handler: () => null,
            options: {
                auth: {
                    scope: 'admin'
                }
            }
        };
        server.route(fakeRoute);

        // exercise
        const response = await server.inject({ method: 'GET', url: fakeRoute.path });

        // validate
        expect(response.statusCode).to.equal(401);
        expect(response.statusMessage).to.equal('Unauthorized');
    });
});
