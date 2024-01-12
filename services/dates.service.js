const pool = require('../db')

class DatesService{
    async createProduction(product_id, production_date, quantity) {
        // валидация данных
        
        const result = await pool.query('INSERT INTO products_productions (product_id, production_date, quantity) VALUES ($1, $2, $3) RETURNING *', [product_id, production_date, quantity]);
        return result.rows[0]
    }

    async createShipping(product_id, order_id, shipping_date, quantity) {
        // валидация данных
        
        const result = await pool.query('INSERT INTO products_shipping (product_id, order_id, shipping_date, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [product_id, order_id, shipping_date, quantity]);
        return result.rows[0]
    }

    async createWriteOff(detail_id, write_off_date, quantity) {
        // валидация данных
        
        const result = await pool.query('INSERT INTO details_write_offs (detail_id, write_off_date, quantity) VALUES ($1, $2, $3) RETURNING *', [detail_id, write_off_date, quantity]);
        return result.rows[0]
    }

    async getProductsProductions() {
        const result = await pool.query('SELECT * FROM products_productions')
        return result.rows
    }

    async getProductsShipping() {
        const result = await pool.query('SELECT * FROM products_shipping')
        return result.rows
    }

    async getProductsWriteOff() {
        const result = await pool.query('SELECT * FROM details_write_offs')
        return result.rows
    }
}

module.exports = new DatesService()
