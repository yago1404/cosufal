const { query } = require('../config/db');

const findAcademicUnityById = async function(id) {
    let response = await query('SELECT * FROM academic_unity WHERE id = $1', [id]);
    if (response.rows.length === 0) return undefined;
    let academicUnity = response.rows[0];
    academicUnity.localization = await findLocalizationById(academicUnity.localization);
    return academicUnity;
};

const findLocalizationById = async function (id) {
    let response = await query('SELECT * FROM localization WHERE id = $1', [id]);
    return response.rows[0];
};

module.exports = { findAcademicUnityById, findLocalizationById };