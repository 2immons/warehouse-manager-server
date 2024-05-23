const Router = require('express')
const settingsController = require('../controllers/settings.controller.js')
const router = new Router()

router.get('/settings', settingsController.getSettings)
router.put('/update-settings', settingsController.updateSettings)

module.exports = router