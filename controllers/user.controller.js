const userService = require('../services/user.service');

class UserController{
    async registerUser(req, res){
        const {username, name, email, password} = req.body
        const user = await userService.createUser(username, name, email, password)
        if (user != false) {
            res.status(201).json({ success: true, user: user });
        } else {
            res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
        }
    }

    async getUsers(req, res){
        const users = await userService.getUsers()
        res.status(201).json({ success: true, users: users });
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        const userData = await userService.authUser(username, password);
        if (userData.token != false) {
            res.status(201).json({ success: true, message: 'Пользователь успешно вошел', user: userData.user, token: userData.token });
        } else {
            res.status(201).json({ success: false, message: 'Неправильный логин или пароль' });
        }
    }

    async updateUser(req, res){
        const { username, name, email, role, is_deleted, id } = req.body
        const updatedUser = await userService.updateUser(username, name, email, role, is_deleted, id)
        res.status(201).json({ success: true, updatedUser: updatedUser });
    }
}

module.exports = new UserController()