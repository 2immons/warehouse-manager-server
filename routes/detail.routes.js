const Router = require('express')
const detailController = require('../controllers/detail.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/enter-supply', detailController.createDetails)
router.get('/details', detailController.getDetails)
router.get('/compabilities', detailController.getCompabilities)
router.get('/detail/:id', detailController.getDetail)
router.put('/update-details', detailController.updateDetails)
router.put('/update-detail', detailController.updateDetail)
router.delete('/delete-detail/:id', detailController.deleteDetail)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router