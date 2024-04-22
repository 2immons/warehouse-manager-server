const Router = require('express')
const documentController = require('../controllers/document.controller.js')
const router = new Router()

router.post('/create-document', documentController.createDocument)
router.get('/documents', documentController.getDocuments)

module.exports = router