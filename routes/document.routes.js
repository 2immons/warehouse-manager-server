const Router = require('express')
const documentController = require('../controllers/document.controller.js')
const router = new Router()

router.post('/create-document', documentController.createDocument)
router.get('/documents', documentController.getDocuments)
router.put('/update-document', documentController.updateDocument)
router.delete('/delete-document/:id', documentController.deleteDocument)

module.exports = router