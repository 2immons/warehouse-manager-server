const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userService{
    async createUser(username, name, email, password, role) {
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

    async getUsers() {
        const result = await pool.query(`
            SELECT users.*, roles.name as role_name
            FROM users
            JOIN roles ON users.role = roles.id;
        `);

        return result.rows
    }

    async authUser(username, password) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
        return false;
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
            expirationTime.setHours(expirationTime.getHours() + 1); // 1 час после текущего времени
            const token = { "tokenValue": tokenValue, "expirationTime": expirationTime}
            return { token, user };
        } else {
            console.log('Плохой пароль')
            return { error: 'Неверный пароль' };
        }
    }
    async deleteUser(id){
        const deletedUser = await db.query('DELETE FROM users WHERE id = $1', [id])
        return deletedUser.rows[0]
    }
}

module.exports = new userService()
