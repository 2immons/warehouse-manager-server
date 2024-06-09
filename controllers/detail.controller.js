const detailService = require('../services/detail.service');
const bodyParser = require('body-parser');

class DetailController{
    async createDetails(req, res){
        const details = []
        const detailsData = req.body;
        for (const detail of detailsData) {
            const { name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, compatibleWith } = detail;
        
            const detailsItem = await detailService.createDetail(name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price)

            for (const productId of compatibleWith) {
                await detailService.addCompability(detailsItem.id, productId)
            }
        
            details.push(detailsItem);
          }
        res.status(201).json({ success: true, details: details });
    }

    async getDetails(req, res){
        const details = await detailService.getDetails()
        res.status(201).json({ success: true, details: details });
    }

    async getCompabilities(req, res){
        const compatibilities = await detailService.getCompabilities()
        res.status(201).json({ success: true, compatibilities: compatibilities })
    }

    async getDetail(req, res){
        const id = req.params.id
        const detail = await detailService.getDetail(id)
        res.status(201).json({ success: true, detail: detail });
    }

    async updateDetails(req, res){
        const updatedDetails = []
        const updatedDetailsData = req.body;
        for (const updatedDetail of updatedDetailsData) {
            const { name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id } = updatedDetail;
        
            const updatedDetailsItem = await detailService.updateDetail(name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id)
        
            updatedDetails.push(updatedDetailsItem);
          }
        res.status(201).json({ success: true, updatedDetails: updatedDetails });
    }

    async updateDetail(req, res){
        const { name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id } = req.body;
        const updatedDetail = await detailService.updateDetail(name, unit, supplied, written_off, supply_date, UPD_SF_number, supplier_name, supplier_INN_KPP, price, id)
        res.status(201).json({ success: true, updatedDetail: updatedDetail });
    }
    async deleteDetail(req, res){
        const id = req.params.id
        const deletedDetail = await detailService.deleteDetail(id)
        res.status(201).json({ success: true, deletedDetail: deletedDetail });
    }
}

module.exports = new DetailController()