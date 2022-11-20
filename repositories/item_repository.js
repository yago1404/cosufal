const { query } = require("../config/db");
const academicUnityRepository = require("../repositories/academic_unity_repository");

const addItem = async function (item) {
    await query('INSERT INTO item(name, amount, status, description, location) VALUES ($1, $2, True, $3, $4)', [item.name, item.amount, item.description, item.location]);
}

const getAllItens = async function () {
    const result = await query('SELECT * FROM item');
    if (result.rows.length > 0) {
        for (let item of result.rows) {
            let local = await academicUnityRepository.findAcademicUnityById(item.location);
            delete item.location;
            item.location = local;
        }
    }
    return result.rows;
}

module.exports = { getAllItens, addItem };