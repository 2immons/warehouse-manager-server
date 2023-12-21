const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(username, name, email, password, role) {
    // валидация данных

    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
        return false
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await pool.query('INSERT INTO users (username, name, email, hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, name, email, hashedPassword, role]);
    return result.rows[0]
}

async function getUsers() {
    const result = await pool.query('SELECT * FROM users')
    return result.rows
}

async function authUser(username, password) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return false;
    }
    const user = result.rows[0]
    const hash = String(user.hash)

    const isPasswordValid = bcrypt.compareSync(password, hash);

    if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        return { token, user };
    }
    else return false
}

module.exports = {
    createUser,
    getUsers,
    authUser
};
