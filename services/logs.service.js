const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LogsService{
    async createLog(user_id, date, operation) {
        const result = await pool.query('INSERT INTO logs (user_id, date, operation) VALUES ($1, $2, $3) RETURNING *', [user_id, date, operation])

        return result.rows[0]
    }

    async createUserLogConnection(log_id, user_id) {
        await pool.query('INSERT INTO logs_users(log_id, user_id) VALUES ($1, $2) RETURNING *', [log_id, user_id])
    }

    async getLogs() {
        const result = await pool.query('SELECT logs.*, users.name FROM logs JOIN users ON logs.user_id = users.id')
        return result.rows
    }

    async getLogsByUserId(userId){
        const result = await pool.query('SELECT * FROM logs_users WHERE user_id = $1', [userId])
        return result.rows
    }

    async getProductByID(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        return result.rows
    }

    // async updateLog(user_id, date, operation, is_read, id) {
    //     const result = await pool.query('UPDATE logs SET user_id = $1, date = $2, operation = $3, is_read = $4 WHERE id = $5', [user_id, date, operation, is_read, id])
    //     return result.rows[0]
    // }

    async updateLog(id, userId) {
        const result = await pool.query('INSERT INTO logs_users(log_id, user_id) VALUES ($1, $2) RETURNING *', [id, userId])
        return result.rows[0]
    }

    async deleteLog(id) {
        const result = await db.query('DELETE FROM logs WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new LogsService()
