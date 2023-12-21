const logsService = require('../services/logs.service');
const bodyParser = require('body-parser');

class LogsController{
    async createLog(req, res){
        const {user_id, date, operation, is_read} = req.body
        const log = await logsService.createLog(user_id, date, operation, is_read)

        if (log != false) {
            res.status(201).json({ success: true, log: log });
        }
    }

    async createLogs(req, res){
        const logs = []
        const logsData = req.body;
        for (const log of logsData) {
            const { user_id, date, operation, is_read } = log;
        
            const logsItem = await logsService.createLog(user_id, date, operation, is_read)
        
            logs.push(logsItem);
          }
        res.status(201).json({ success: true, logs: logs });
    }

    async getLogs(req, res){
        const logs = await logsService.getLogs()
        res.status(201).json({ success: true, logs: logs });
    }

    async getNotifications(req, res){
        const logs = await logsService.getNotifications()
        res.status(201).json({ success: true, logs: logs });
    }

    async updateLogs(req, res){
        const updatedLogs = []
        const updatedLogsData = req.body;
        for (const updatedLog of updatedLogsData) {
            const { user_id, date, operation, is_read, id } = updatedLog;
        
            const updatedLogsItem = await logsService.updateLog(user_id, date, operation, is_read, id)
        
            updatedLogs.push(updatedLogsItem);
          }
        res.status(201).json({ success: true, updatedLogs: updatedLogs });
    }

    async updateLog(req, res){
        const {user_id, date, operation, is_read, id} = req.body
        const updatedLog = await logsService.updateLog(user_id, date, operation, is_read, id)
        res.status(201).json({ success: true, updatedLog: updatedLog });
    }
    async deleteLog(req, res){
        const id = req.params.id
        const deletedLog = await logsService.deleteLog(id)
        res.status(201).json({ success: true, deletedLog: deletedLog });
    }
}

module.exports = new LogsController()