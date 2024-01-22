const Router = require('express')
const productController = require('../controllers/product.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/create-product', productController.createProduct)
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProductByID)
router.put('/update-products', productController.updateProducts)
router.put('/update-product', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct),
router.get('/document', productController.getdocument)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router