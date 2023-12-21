const Router = require('express')
const agentController = require('../controllers/agent.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/create-counterparty', agentController.createAgent)
router.get('/agents', agentController.getAgents)
router.put('/update-counterparty', agentController.updateAgent)
router.delete('/delete-counterparty/:id', agentController.deleteAgent)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router