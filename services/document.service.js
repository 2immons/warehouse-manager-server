const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createDocument(username, name, email, password, role) {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
        return false
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await pool.query('INSERT INTO documents (username, name, email, hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, name, email, hashedPassword, role]);
    return result.rows[0]
}

async function getDocuments() {
    const result = await pool.query('SELECT * FROM documents')
    return result.rows
}

module.exports = {
    createDocument,
    getDocuments
};
