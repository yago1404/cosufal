const { query } = require("../config/db");
const academicUnityRepository = require("../repositories/academic_unity_repository");

const getAllItens = async function() {
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

module.exports = { getAllItens };