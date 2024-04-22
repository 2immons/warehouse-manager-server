const documentService = require('../services/document.service');

class DocumentController{
    async createDocument(req, res){
        const {username, name, email, password, role} = req.body
        const user = await documentService.createDocument(username, name, email, password, role)
        if (user != false) {
            res.status(201).json({ success: true, user: user });
        } else {
            res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
        }
    }

    async getDocuments(req, res){
        const users = await documentService.getDocuments()
        res.status(201).json({ success: true, users: users });
    }
}

module.exports = new DocumentController()