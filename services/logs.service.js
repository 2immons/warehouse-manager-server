const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LogsService{
    async createLog(user_id, date, operation, is_read) {
        // валидация данных

        const result = await pool.query('INSERT INTO logs (user_id, date, operation, is_read) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, date, operation, is_read]);
        return result.rows[0]
    }

    async getLogs() {
        const result = await pool.query('SELECT * FROM logs')
        return result.rows
    }

    async getNotifications(req, res){
        const result = await pool.query('SELECT * FROM logs WHERE is_read = false')
        return result.rows
    }

    async getProductByID(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        return result.rows
    }

    async updateLog(user_id, date, operation, is_read, id) {
        const result = await pool.query('UPDATE logs SET user_id = $1, date = $2, operation = $3, is_read = $4 WHERE id = $5', [user_id, date, operation, is_read, id])
        return result.rows[0]
    }

    async deleteLog(id) {
        const result = await db.query('DELETE FROM logs WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new LogsService()
