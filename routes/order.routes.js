const Router = require('express')
const orderController = require('../controllers/order.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/create-order', orderController.createOrder)
router.get('/orders', orderController.getOrders)
router.put('/update-order', orderController.updateOrder)
router.put('/update-orders', orderController.updateOrders)
router.delete('/delete-order', orderController.deleteOrder)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router