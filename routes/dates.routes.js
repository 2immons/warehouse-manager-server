const Router = require('express')
const datesController = require('../controllers/dates.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/create-production', datesController.createProduction)
router.post('/create-shipping', datesController.createShipping)
router.post('/create-write-off', datesController.createWriteOff)
router.get('/get-products-productions', datesController.getProductsProductions)
router.get('/get-products-shipping', datesController.getProductsShipping)
router.get('/get-products-write-off', datesController.getProductsWriteOff)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router