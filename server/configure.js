var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'), //templating engine
    express = require('express'),
    bodyParser = require('body-parser'), //packs any form fields submitted via HTML
    cookieParser = require('cookie-parser'), //allows cookies to be sent and received
    morgan = require('morgan'), //logging. debugs Node server
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'), //handles errors occuring in the entire middleware process
    moment = require('moment');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser({
        uploadDir: path.join(__dirname, 'public/upload/temp')
    }));
    //app.use(bodyParser.urlencoded({ 'extended': true }));
    //app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app); //moving the routes to routes folder
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    //routes(app)
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');
    return app;
};