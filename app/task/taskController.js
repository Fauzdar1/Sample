let pool = require('../common/database').connection;
const common = require('../common/database');
require('body-parser');

/**
 * Function with the Pg-pool package to test query in the function itself.
 * param email - This is the email of the user trying to login.
 * param pass - This is the password of the user.
 */
const login = (req, res) => {
    //Getting Email and password in request body
    let {email, pass} = req.body;
    const text = 'select * from public.profile_user where email = $1 and password = $2';
    const values = [email, pass];

    pool.query(text, values, (error, result) => {
        if (error) {
            console.log('Query error ' + error);
            res.status(201).end("Database Error");
        } else {
            res.status(200).end(JSON.stringify(result))
        }
    });
}

/**
 * Function with the Massive DB package to test query as SQL file
 * param email - Email to get user data
 * param pass - Password to get user data
 */
const getUserData = async (req, res) => {
    const db = req.app.get('db');

    //Getting Email and password in request body
    const {email, pass} = req.body;

    if (email && pass) {
        let response = db.getUserData({email, pass});
        if (!response.empty) {
            res.status(200).end(JSON.stringify(response));
        } else {
            res.status(201).end('No Such user');
        }
    } else
        res.status(201).end(common.try_again);
};

module.exports = {
    login,
    getUserData
};

