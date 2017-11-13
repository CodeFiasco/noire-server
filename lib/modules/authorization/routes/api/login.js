var Joi = require('joi');
var LoginCtrl = require('../../controllers/api/login');
var User = require('../../../../models/user');

// POST /login
exports.login = {
    description: 'Authenticate user credentials',
    handler: LoginCtrl.login,
    auth: false,
    validate: {
        payload: {
            username: Joi.string().min(User.USERNAME_MIN_LENGTH).max(User.USERNAME_MAX_LENGTH).required(),
            password: Joi.string().min(User.PASSWORD_MIN_LENGTH).max(User.PASSWORD_MAX_LENGTH).required()
        }
    },
    plugins: {
        stateless: true
    }
};

// GET /logout
exports.logout = {
    description: 'Destroys authenticated session',
    handler: LoginCtrl.logout,
    plugins: {
        stateless: true
    }
};