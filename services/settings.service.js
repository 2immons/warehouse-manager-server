const pool = require('../db')

class SettingsService{
    async getSettings() {
        const result = await pool.query('SELECT * FROM settings')
        return result.rows[0]
    }

    async updateSettings(is_in_configuration_mode, name, adress, INN, OGRN, CEO) {
        const result = await pool.query('UPDATE settings SET is_in_configuration_mode = $1, name = $2, adress = $3, INN = $4, OGRN = $5, CEO = $6', [is_in_configuration_mode, name, adress, INN, OGRN, CEO])
        return result.rows[0]
    }
}

module.exports = new SettingsService()
