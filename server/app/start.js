var server = require('http').createServer();

var createApplication = function () {
    var app = require('.');
    server.on('request', app); // Attach the Express application.
};

var startServer = function () {

    var PORT = process.env.PORT || 8080;

    server.listen(PORT, function () {
        console.log('Server started on port: ', PORT);
    });

};

createApplication();
startServer();
