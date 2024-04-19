const pool = require('../db')

class OrderService{
    async createOrder(client_id, is_commercial_secret, creation_date, deadline, doc_number) {
        const result = await pool.query('INSERT INTO orders (client_id, is_commercial_secret, creation_date, deadline, doc_number) VALUES ($1, $2, $3, $4, $5) RETURNING *', [client_id, is_commercial_secret, creation_date, deadline, doc_number]);
        return result.rows[0]
    }

    async createOrderProducts(order_id, product_id, quantity, is_ready_to_ship) {
        const result = await pool.query('INSERT INTO orders_products (order_id, product_id, quantity, is_ready_to_ship) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_id, quantity, is_ready_to_ship]);
        return result.rows[0]
    }

    async getOrders() {
        const result = await pool.query(`
            SELECT
                o.id,
                a.name AS client_name,
                a.adress AS client_adress,
                a.inn AS client_inn,
                a.kpp AS client_kpp,
                a.id AS client_id,
                o.is_commercial_secret,
                o.creation_date,
                o.deadline,
                o.doc_number,
                o.shipping_status,
                o.requirements,
                json_agg(json_build_object(
                    'order_id', op.order_id,
                    'product_id', op.product_id,
                    'product_name', p.name,
                    'quantity', op.quantity,
                    'is_ready_to_ship', op.is_ready_to_ship
                )) AS positions
            FROM
                orders o
            JOIN
                orders_products op ON o.id = op.order_id
            JOIN
                products p ON op.product_id = p.id  -- добавляем соединение с таблицей products
            JOIN
                agents a ON o.client_id = a.id  -- добавлено соединение с таблицей agents
            GROUP BY
                1, 2, 3, 4, 5, 6
        `);
        
        return result.rows;
    }    

    async getProductByID(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        return result.rows
    }

    async updateOrder(client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, id) {
        const result = await pool.query('UPDATE orders SET client_id = $1, is_commercial_secret = $2, creation_date = $3, deadline = $4, doc_number = $5, shipping_status = $6, requirements = $7 WHERE id = $8', [client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, id])
        return result.rows[0]
    }

    async updateOrderProducts(quantity, is_ready_to_ship, order_id, product_id) {
        const existingPosition = await pool.query('SELECT * FROM orders_products WHERE order_id = $1 AND product_id = $2', [order_id, product_id]);

        if (existingPosition.rows.length > 0) {
            const result = await pool.query('UPDATE orders_products SET quantity = $1, is_ready_to_ship = $2 WHERE order_id = $3 AND product_id = $4', [quantity, is_ready_to_ship, order_id, product_id])
            return result.rows[0]
        } else {
            const result = await pool.query('INSERT INTO orders_products (order_id, product_id, quantity, is_ready_to_ship) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_id, quantity, is_ready_to_ship]);
            return result.rows[0]
        }
    }

    async deleteProduct(id) {
        const result = await db.query('DELETE FROM products WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new OrderService()
