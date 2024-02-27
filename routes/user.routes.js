const Router = require('express')
const userController = require('../controllers/user.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/register', userController.registerUser)
router.get('/users', userController.getUsers)
router.post('/login', userController.loginUser)

module.exports = router