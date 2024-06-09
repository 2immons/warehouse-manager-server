const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: 'Originrega',
    host: 'localhost',
    port: 7432,
    database: 'production-management-db',
    encoding: 'UTF8'
})

module.exports = pool