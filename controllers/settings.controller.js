const settingsService = require('../services/settings.service');

class SettingsController{
    async getSettings(req, res){
        const settings = await settingsService.getSettings()
        res.status(201).json({ success: true, settings: settings });
    }

    async updateSettings(req, res){
        const { is_in_configuration_mode, name, adress, INN, OGRN, CEO } = req.body;
        const updatedSettings = await settingsService.updateSettings(is_in_configuration_mode, name, adress, INN, OGRN, CEO)
        res.status(201).json({ success: true, updatedSettings: updatedSettings });
    }
}

module.exports = new SettingsController()