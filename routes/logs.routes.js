const Router = require('express')
const logsController = require('../controllers/logs.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/create-logs', logsController.createLogs)
router.get('/logs', logsController.getLogs)
router.get('/notifications', logsController.getNotifications)
router.put('/update-logs', logsController.updateLogs)
router.put('/update-log/:id', logsController.updateLog)
router.delete('/delete-log/:id', logsController.deleteLog)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router