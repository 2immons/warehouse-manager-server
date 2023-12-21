const orderService = require('../services/order.service');
const bodyParser = require('body-parser');

class OrderController{
    async createOrder(req, res){
        const {client_id, is_commercial_secret, creation_date, deadline, doc_number, positions} = req.body
        const order = await orderService.createOrder(client_id, is_commercial_secret, creation_date, deadline, doc_number)

        const order_id = order.id

        for (const position of positions) {
            const { product_id, quantity, is_ready_to_ship } = position;
        
            await orderService.createOrderProducts(order_id, product_id, quantity, is_ready_to_ship)
          }

        if (order != false) {
            res.status(201).json({ success: true, order: order });
        }
    }

    async getOrders(req, res){
        const orders = await orderService.getOrders()
        res.status(201).json({ success: true, orders: orders });
    }

    async updateOrders(req, res){
        const updatedOrders = []
        const updatedOrdersData = req.body;
        for (const updatedOrder of updatedOrdersData) {
            const { client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, positions, id } = updatedOrder;
        
            const updatedOrdersItem = await orderService.updateOrder(client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, id)

            for (const updatedOrderPosition of positions) {
                const { order_id, product_id, quantity, is_ready_to_ship } = updatedOrderPosition

                await orderService.updateOrderProducts(quantity, is_ready_to_ship, order_id, product_id)
            }
        
            updatedOrders.push(updatedOrdersItem);
          }
        res.status(201).json({ success: true, updatedOrders: updatedOrders });
    }

    async updateOrder(req, res){
        const {client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, id} = req.body
        const updatedOrder = await orderService.updateOrder(client_id, is_commercial_secret, creation_date, deadline, doc_number, shipping_status, requirements, id)
        res.status(201).json({ success: true, updatedOrder: updatedOrder });
    }
    async deleteOrder(req, res){
        const id = req.params.id
        const deletedProduct = await orderService.deleteOrder(id)
        res.status(201).json({ success: true, deletedProduct: deletedProduct });
    }
}

module.exports = new OrderController()