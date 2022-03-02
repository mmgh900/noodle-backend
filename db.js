const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'NoodleDb',
    password: process.env.PGPASSWORD || 'toktamabasi',
    max: 20,
    idleTimeoutMillis: 2
})

module.exports = (query, parameters) => pool.query(query, parameters)