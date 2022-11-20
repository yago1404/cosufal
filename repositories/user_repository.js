const { query } = require("../config/db");
const academicUnityRepository = require("../repositories/academic_unity_repository");

const composeUser = async function (user) {
    user.academic_unity = await academicUnityRepository.findAcademicUnityById(user.academic_unity);
    return user;
}

const findUserById = async function(id) {
    let response = await query('SELECT * FROM app_user WHERE id = $1', [id] );
    if (response.rows.length === 0) return undefined;
    let user = response.rows[0];
    delete user.password;
    return await composeUser(user);
}

const doLogin = async function(email, password) {
    let response = await query('SELECT * FROM app_user WHERE email = $1 AND password = $2', [email, password]);
    if (response.rows.length === 0) return undefined;
    let user = response.rows[0];
    delete user.password;
    return await composeUser(user);
}

module.exports = { doLogin, findUserById };