const Router = require('express')
const userController = require('../controllers/user.controller.js')
const router = new Router()

router.post('/register', userController.registerUser),
router.get('/users', userController.getUsers),
router.post('/login', userController.loginUser),
router.put('/update-user', userController.updateUser)

module.exports = router