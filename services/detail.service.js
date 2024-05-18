const pool = require('../db')

class DetailService{
    async createDetail(name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price) {
        const result = await pool.query('INSERT INTO details (name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price]);
        return result.rows[0]
    }

    async addCompability(detailsItemId, productId) {
        const result = await pool.query('INSERT INTO compatibilities (detail_id, product_id) VALUES ($1, $2) RETURNING *', [detailsItemId, productId]);
        return result.rows[0]
    }

    async getDetails() {
        const result = await pool.query('SELECT * FROM details')
        return result.rows
    }

    async getCompabilities() {
        const result = await pool.query('SELECT * FROM compatibilities')
        return result.rows
    }

    async getDetail(id) {
        const result = await pool.query('SELECT * FROM details WHERE id = $1', [id])
        return result.rows
    }

    async updateDetail(name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id) {
        await pool.query('UPDATE details SET name = $1, unit = $2, supplied = $3, written_off = $4, supply_date = $5, UPD_SF_number = $6, supplier_name = $7, supplier_INN_KPP = $8, price = $9 WHERE id = $10', [name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id])
        return name
    }

    async deleteDetail(id) {
        const result = await db.query('DELETE FROM details WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new DetailService()
