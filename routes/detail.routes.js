const Router = require('express')
const detailController = require('../controllers/detail.controller.js')
const router = new Router()

router.post('/enter-supply', detailController.createDetails)
router.get('/details', detailController.getDetails)
router.get('/compabilities', detailController.getCompabilities)
router.get('/detail/:id', detailController.getDetail)
router.put('/update-details', detailController.updateDetails)
router.put('/update-detail', detailController.updateDetail)
router.delete('/delete-detail/:id', detailController.deleteDetail)

module.exports = router