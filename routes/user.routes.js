const Router = require('express')
const userController = require('../controllers/user.controller.js')
const router = new Router()
// const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/register', userController.registerUser)
router.get('/users', userController.getUsers)
router.get('/login', userController.loginUser)
// router.get('/user/:id', userController.getUserById)
// router.put('/user', userController.updateUser)
// router.delete('/user/:id', userController.deleteUser)

//https://youtu.be/H2GCkRF9eko?t=3973

module.exports = router