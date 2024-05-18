const pool = require('../db')

class ProductService{
    async createProduct(name, description) {
        const result = await pool.query('INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
        return result.rows[0]
    }

    async getProducts() {
        const result = await pool.query('SELECT * FROM products')
        return result.rows
    }

    async getProductByID(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        return result.rows
    }

    async updateProduct(name, produced, shipped, ready_to_ship, id) {
        const result = await pool.query('UPDATE products SET name = $1, produced = $2, shipped = $3, ready_to_ship = $4 WHERE id = $5', [name, produced, shipped, ready_to_ship, id])
        return result.rows[0]
    }

    async deleteProduct(id) {
        const result = await db.query('DELETE FROM products WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new ProductService()
