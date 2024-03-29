const userService = require('../services/user.service');

class UserController{
    async registerUser(req, res){
        const {username, name, email, password, role} = req.body
        const user = await userService.createUser(username, name, email, password, role)
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
        //const isAuthenticated = await userService.authUser(username, password);
        // if (isAuthenticated) {
        //     const token = authService.generateAuthToken(username);
        //     res.json({ success: true });
        // } else {
        // res.status(401).json({ success: false, message: 'Неверные учетные данные' });
        // }
    }

    


    // async getUserById(req, res){
    //     const id = req.params.id
    //     const user = await db.query('SELECT * FROM Users WHERE id = $1', [id])
    //     res.json(user.rows[0])
    // }

    // async updateUser(req, res){
    //     const {id, login, password, role} = req.body
    //     const updatedUser = await db.query('UPDATE Users SET login = $1, password = $2, role = $3 WHERE id = $4', [login, password, role, id])
    //     res.json(updatedUser.rows[0])
    // }
    // async deleteUser(req, res){
    //     const id = req.params.id
    //     const deletedUser = await db.query('DELETE FROM Users WHERE id = $1', [id])
    //     res.json(deletedUser.rows[0])
    // }
}

module.exports = new UserController()