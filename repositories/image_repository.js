const { query } = require("../config/db");

const getImagesByItemId = async function (itemId) {
    let result = await query('SELECT * FROM image WHERE item_id = $1', [itemId]);
    return result.rows;
}

const insertImage = async function (code) {
    let resultLastItem = await query('SELECT * FROM item ORDER BY ID DESC LIMIT 1');
    await query('INSERT INTO image(item_id, code) VALUES ($1, $2)', [resultLastItem.rows[0].id, code]);
}

module.exports = { getImagesByItemId, insertImage };
