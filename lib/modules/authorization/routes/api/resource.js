/**
 * Api resource routes
 */

const Joi = require('joi');
const AuthCtrl = require('modules/authorization/controllers/authorization');
const ResourceCtrl = require('modules/authorization/controllers/api/resource');
const Resources = require('enums/resources');
const Actions = require('utils/action');

// GET /resource
exports.list = {
    description: 'Lists all resources and permissions in the system',
    pre: [AuthCtrl.authorize(Resources.ROLE, Actions.LIST)],
    handler: ResourceCtrl.list
};

// GET /resource/{name}
exports.get = {
    description: 'Gets a resource by name',
    pre: [AuthCtrl.authorize(Resources.PERMISSION)],
    handler: ResourceCtrl.getByName,
    validate: {
        params: {
            name: Joi.string()
                .required()
                .description('The name of the resource')
        }
    }
};
