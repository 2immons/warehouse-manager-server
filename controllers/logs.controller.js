const logsService = require('../services/logs.service');

class LogsController{
    async createLog(req, res){
        const {user_id, date, operation} = req.body
        const log = await logsService.createLog(user_id, date, operation)

        await logsService.createUserLogConnection(log.id, user_id)

        res.status(201).json({ success: true, log: log })
    }

    async getLogs(req, res){
        const logs = await logsService.getLogs()
        res.status(201).json({ success: true, logs: logs });
    }

    async getNotifications(req, res){
        const userId = req.cookies.userId
        const notifications = []

        const logs = await logsService.getLogs()
        const writtenLogs = await logsService.getLogsByUserId(userId)
        logs.forEach(log => {
            if (!writtenLogs.some(writtenLog => writtenLog.log_id === log.id)) {
                notifications.push(log);
            }
        })
        res.status(201).json({ success: true, notifications: notifications });
    }

    async updateLogs(req, res){
        const userId = req.cookies.userId
        const updatedLogs = []
        const updatedLogsData = req.body;
        for (const updatedLogItem of updatedLogsData) {
            const { id } = updatedLogItem;
        
            const updatedLog = await logsService.updateLog(id, userId)
        
            updatedLogs.push(updatedLog);
          }
        
        res.status(201).json({ success: true, updatedLogs: updatedLogs });
    }

    async updateLog(req, res){
        const userId = req.cookies.userId
        const {id} = req.body
        // const updatedLog = await logsService.updateLog(user_id, date, operation, is_read, id)
        const updatedLog = await logsService.updateLog(id, userId)
        res.status(201).json({ success: true, updatedLog: updatedLog });
    }
    async deleteLog(req, res){
        const id = req.params.id
        const deletedLog = await logsService.deleteLog(id)
        res.status(201).json({ success: true, deletedLog: deletedLog });
    }
}

module.exports = new LogsController()