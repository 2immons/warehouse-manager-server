const Router = require('express')
const logsController = require('../controllers/logs.controller.js')
const router = new Router()

router.post('/create-log', logsController.createLog)
router.get('/logs', logsController.getLogs)
router.get('/notifications', logsController.getNotifications)
router.put('/update-logs', logsController.updateLogs)
router.put('/update-log', logsController.updateLog)
router.delete('/delete-log/:id', logsController.deleteLog)

module.exports = router