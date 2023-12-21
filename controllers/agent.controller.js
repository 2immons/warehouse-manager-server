const agentService = require('../services/agent.service');

class AgentController{
    async createAgent(req, res){
        const {name, adress, INN, KPP} = req.body
        const agent = await agentService.createAgent(name, adress, INN, KPP)
        if (agent != false) {
            res.status(201).json({ success: true, agent: agent });
        } else {
            res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
        }
    }

    async getAgents(req, res){
        const agents = await agentService.getAgents()
        res.status(201).json({ success: true, agents: agents })
    }

    async updateAgent(req, res){
        const {name, adress, INN, KPP, id} = req.body
        const updatedAgent = await agentService.updateAgent(name, adress, INN, KPP, id)
        if (updatedAgent != false) {
            res.status(201).json({ success: true, updatedAgent: updatedAgent });
        } else {
            res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
        }
    }
    async deleteAgent(req, res){
        const id = req.params.id
        const deletedAgent = await agentService.deleteAgent(id)
        res.status(201).json({ success: true, deletedAgent: deletedAgent })
    }
}

module.exports = new AgentController()