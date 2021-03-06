require('form-serializer');
require('../../semantic/dist/semantic.css');
require('../../semantic/dist/semantic.js');
require('../../semantic-ui-alerts/semantic-ui-alerts.css');
require('../../semantic-ui-alerts/semantic-ui-alerts.js');
require('../assets/css/app.css');

exports.config = require('./config');
exports.commons = require('./commons');

$(document).ready(function() {
    setupNav();
    setupApi();
});

function setupNav() {
    $('a.item').click(function() {
        $('.item').removeClass('active');
        $(this).addClass('active');
    });

    $('.ui.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('attach events', '.sidebar.toggle');
    $('.ui.sidebar').removeClass('disabled');
}

function setupApi() {
    // setup API endpoints
    $.fn.api.settings.api = exports.config.api.routes;
}
