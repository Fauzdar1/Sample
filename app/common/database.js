const Pool = require('pg').Pool;

/**
 * Set your PostgreSQL database details here to connect it with the backend
 * @type {{database: string, password: string, port: number, host: string, user: string}}
 */
const connectionObject = {
    user: 'Username',
    host: 'Host URL',
    database: 'Database Name',
    password: 'Password',
    port: 5432,//"PORT as Integer"
};

module.exports = {

    connection: new Pool(connectionObject),

    //Connection String used by Massive to connect to the database
    connection_string: connectionObject,

    //Message to show in case of invalid data passed from frontend
    try_again: 'Invalid details, please try again',

    //Server Port
    server_port: 4001

};
