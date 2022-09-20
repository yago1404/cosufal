const { query } = require("../config/db");
const findUserById = async function(id) {
    let response = await query('SELECT * FROM app_user WHERE id = $1', [id] );
    if (response.rows.length > 0) return response.rows[0];
}

const doLogin = async function(email, password) {
    let response = await query('SELECT * FROM app_user WHERE email = $1 AND password = $2', [email, password]);
    delete response.rows[0].password;
    return response.rows[0];

}

module.exports = { doLogin, findUserById };