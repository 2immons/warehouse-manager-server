const pool = require('../db')

class DocumentService{
    async createDocument(title, file_data, description, isDefault, type) {
        const result = await pool.query('INSERT INTO documents (title, file_data, description, is_default, type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, file_data, description, isDefault, type]);
        return result.rows[0]
    }

    async getDocuments() {
        const result = await pool.query('SELECT * FROM documents')
        return result.rows
    }

    async updateDocument(title, file_data, description, isDefault, type, id) {
        const result = await pool.query('UPDATE documents SET title = $1, file_data = $2, description = $3, is_default = $4, type = $5 WHERE id = $6', [title, file_data, description, isDefault, type, id])
        return result.rows[0]
    }

    async deleteDocument(id) {
        const result = await pool.query('DELETE FROM documents WHERE id = $1', [id])
        return result.rows[0]
    }
}
module.exports = new DocumentService()
