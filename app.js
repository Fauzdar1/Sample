const taskController = require('./app/task/taskController');
const express = require('express');
const bodyParser = require('body-parser');
const common = require('./app/common/database');
const massive = require('massive');
const app = express();

/**
 * To initiate the Project
 * 1. Set-up the connection string of Postgres in database.js file
 * 2. Run npm install to install the Packages associated with this project.
 * 3. Run the project using node app.js and check the routes.
 */

/**
 * Applying Middleware
 */
function applyMiddleware() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
}

/**
 * Initializing Database using Massive
 */
function initializingDatabase() {
    // noinspection JSUnresolvedFunction
    massive(common.connection_string).then(db => {
        app.set('db', db);
        console.log('db connected!')
    });
}

/**
 * Basic Authentication Routes
 */

function authenticationRoutes() {
    //Logging-in an existing user
    app.post('/login', taskController.login);

    //You can also add a middleware function which checks for example, basic auth before going to the actual API function.
    app.get('/get/data', middleware, taskController.getUserData);
}

const middleware = (req, res, next) => {
    //Check for any condition and call next() if true.

    //For example
    /**
     if (req.headers.token && req.headers.token === your_token) {
        next();
    } else {
        res.status(201).end("Invalid Token");
    }
     */

    //Calling next to continue the functioning
    next();
}


/**
 * Calling all the functions which consist routes.
 */
applyMiddleware();
initializingDatabase();
authenticationRoutes();

/**
 * Starting the server
 */
app.listen(common.server_port, () => {
    console.log('Server Started on port ' + common.server_port);
});
