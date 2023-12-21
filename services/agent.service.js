const { deleteAgent } = require('../controllers/agent.controller');
const pool = require('../db')

class AgentService{
    async createAgent(name, adress, INN, KPP) {
        // валидация данных

        const existingAgent = await pool.query('SELECT * FROM agents WHERE name = $1', [name]);

        if (existingAgent.rows.length > 0) {
            return false
        }

        const result = await pool.query('INSERT INTO agents (name, adress, INN, KPP) VALUES ($1, $2, $3, $4) RETURNING *', [name, adress, INN, KPP]);
        return result.rows[0]
    }

    async getAgents() {
        const result = await pool.query('SELECT * FROM agents')
        return result.rows
    }

    async updateAgent(name, adress, INN, KPP, id) {
        const result = await pool.query('UPDATE agents SET name = $1, adress = $2, INN = $3, KPP = $4 WHERE id = $5', [name, adress, INN, KPP, id])
        return result.rows[0]
    }

    async deleteAgent(id) {
        const result = await pool.query('DELETE FROM agents WHERE id = $1', [id])
        return result.rows[0]
    }
}

module.exports = new AgentService()
