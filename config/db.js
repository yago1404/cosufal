const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:'+ process.env.DB_PASSWORD+'@localhost:5432/cosufal',
});

pool.on('connect', () => {
    console.log('data base connected');
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};