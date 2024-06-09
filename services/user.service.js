const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService{
    async createUser(username, name, email, password) {
        const users = await pool.query(`SELECT * from users`);
        let role = users.rows.length < 0 ? 1: 2

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

    async updateUser(username, name, email, role, is_deleted, id) {
        const result = await pool.query('UPDATE users SET username = $1, name = $2, email = $3, role = $4, is_deleted = $5 WHERE id = $6', [username, name, email, role, is_deleted, id])
        return result.rows[0]
    }

    async getUsers() {
        const result = await pool.query(`
            SELECT users.*, roles.name as role_name
            FROM users
            JOIN roles ON users.role = roles.id
            WHERE users.is_deleted IS NOT TRUE;
        `)

        return result.rows
    }

    async authUser(username, password) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0 || result.rows[0].is_deleted === true) {
            return { error: 'Нет такого пользователя или пользователь удален' };
        }

        const user = result.rows[0]
        const hash = String(user.hash)

        const isPasswordValid = bcrypt.compareSync(password, hash);

        if (isPasswordValid) {
            const payload = {
                userId: user.id,
                username: user.username
            };
            const tokenValue = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
            const token = { "tokenValue": tokenValue, "expirationTime": expirationTime}
            return { token, user };
        } else {
            console.log('Плохой пароль')
            return { error: 'Неверный пароль' };
        }
    }
}

module.exports = new userService()
