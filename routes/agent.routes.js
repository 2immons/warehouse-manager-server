const Router = require('express')
const agentController = require('../controllers/agent.controller.js')
const router = new Router()

router.post('/create-counterparty', agentController.createAgent)
router.get('/agents', agentController.getAgents)
router.put('/update-counterparty', agentController.updateAgent)
router.delete('/delete-counterparty/:id', agentController.deleteAgent)

module.exports = router