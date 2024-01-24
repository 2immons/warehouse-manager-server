// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const path = req.path;
    console.log(path)
    if (path === '/login' || path === '/register') {
        // Если это маршрут для входа или регистрации, пропустить middleware и перейти к следующему обработчику
        return next();
    }

    console.log("token = " + req.cookies.token)
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Проверка и верификация токена
        const decoded = jwt.verify(token, 'your_secret_key'); // Замените на ваш секретный ключ

        // Добавление данных пользователя к объекту запроса для использования в следующих обработчиках
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;
