const Router = require('express')
const datesController = require('../controllers/dates.controller.js')
const router = new Router()

router.post('/create-production', datesController.createProduction)
router.post('/create-shipping', datesController.createShipping)
router.post('/create-write-off', datesController.createWriteOff)
router.get('/products-productions', datesController.getProductsProductions)
router.get('/products-shippings', datesController.getProductsShippings)
router.get('/products-write-offs', datesController.getProductsWriteOffs)

module.exports = router