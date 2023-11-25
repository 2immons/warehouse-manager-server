const pool = require('../db')
const bcrypt = require('bcrypt');

async function createUser(username, password) {
    // валидация данных

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await pool.query(
        'INSERT INTO users (username, salt, hash) VALUES ($1, $2, $3) RETURNING *',
        [username, salt, hashedPassword]
      );
    return result.rows[0]
}

async function getUsers() {
    const result = await pool.query('SELECT * FROM users', [username, salt, hashedPassword])
    return result.rows
}

async function authUser(username, password) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return false;
    }
    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.hash);

    return isPasswordValid;
}

module.exports = {
    createUser,
    getUsers,
    authUser
};
