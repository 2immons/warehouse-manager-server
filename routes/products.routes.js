const Router = require('express')
const productController = require('../controllers/product.controller.js')
const router = new Router()

router.post('/create-product', productController.createProduct)
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProductByID)
router.put('/update-products', productController.updateProducts)
router.put('/update-product', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct),
router.get('/document', productController.getDocument)

module.exports = router