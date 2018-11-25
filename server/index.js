const express = require('express');
const path = require('path');
const products = require('./app/controllers/products.controller')
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores
if (cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {

    const app = express();
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // parse application/json
    app.use(bodyParser.json())

    // Configuring the database
    var dbConfig = require('./config/database.config.js');
    var mongoose = require('mongoose');
    // Priority serve any static files.
    //app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    mongoose.Promise = global.Promise;

    mongoose.connect(dbConfig.url, { useNewUrlParser: true });

    mongoose.connection.on('error', function () {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

    mongoose.connection.once('open', function () {
        console.log("Successfully connected to the database");
    })

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    require('./app/routes/products.routes.js')(app);

    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    app.listen(PORT, function () {
        console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
    });

}