const Router = require('express')
const orderController = require('../controllers/order.controller.js')
const router = new Router()

router.post('/create-order', orderController.createOrder)
router.get('/orders', orderController.getOrders)
router.put('/update-order', orderController.updateOrder)
router.put('/update-orders', orderController.updateOrders)
router.delete('/delete-order', orderController.deleteOrder)

module.exports = router