const documentService = require('../services/document.service');

class DocumentController{
    async createDocument(req, res){
        const {title, file_data, description, isDefault, type} = req.body
        const document = await documentService.createDocument(title, file_data, description, isDefault, type)
        res.status(201).json({ success: true, document: document })
    }

    async getDocuments(req, res){
        const documents = await documentService.getDocuments()
        res.status(201).json({ success: true, documents: documents });
    }

    async updateDocument(req, res){
        const { title, file_data, description, isDefault, type, id } = req.body;
        const updatedDocument = await documentService.updateDocument(title, file_data, description, isDefault, type, id)
        res.status(201).json({ success: true, updatedDocument: updatedDocument });
    }

    async deleteDocument(req, res){
        const id = req.params.id
        const deletedDocument = await documentService.deleteDocument(id)
        res.status(201).json({ success: true, deletedDocument: deletedDocument })
    }
}

module.exports = new DocumentController()