const datesService = require('../services/dates.service');

class DatesController{
    async createProduction(req, res){
        const {product_id, production_date, quantity} = req.body
        const production = await datesService.createProduction(product_id, production_date, quantity)
        if (production != false) {
            res.status(201).json({ success: true, production: production });
        } else {
            res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
        }
    }

    async createShipping(req, res){
        const shippings = []
        const shippingsData = req.body;
        for (const shippingsItem of shippingsData) {
            const { product_id, order_id, shipping_date, quantity } = shippingsItem;
        
            const shipping = await datesService.createShipping(product_id, order_id, shipping_date, quantity)
        
            shippings.push(shipping);
          }
        res.status(201).json({ success: true, shippings: shippings });
    }

    async createWriteOff(req, res){
        const writeOffs = []
        const writeOffsData = req.body;
        for (const writeOffsItem of writeOffsData) {
            const { detail_id, write_off_date, quantity } = writeOffsItem;
        
            const writeOff = await datesService.createWriteOff(detail_id, write_off_date, quantity)
        
            writeOffs.push(writeOff);
          }
        res.status(201).json({ success: true, writeOffs: writeOffs });
    }

    async getProductsProductions(req, res){
        const productsProductions = await datesService.getProductsProductions()
        res.status(201).json({ success: true, productions: productsProductions })
    }

    async getProductsShippings(req, res){
        const productsShipping = await datesService.getProductsShipping()
        res.status(201).json({ success: true, shippings: productsShipping })
    }

    async getProductsWriteOffs(req, res){
        const productsWriteOff = await datesService.getProductsWriteOff()
        res.status(201).json({ success: true, writeOffs: productsWriteOff })
    }

    // async updateAgent(req, res){
    //     const {name, adress, INN, KPP, id} = req.body
    //     const updatedAgent = await datesService.updateAgent(name, adress, INN, KPP, id)
    //     if (updatedAgent != false) {
    //         res.status(201).json({ success: true, updatedAgent: updatedAgent });
    //     } else {
    //         res.status(201).json({ success: false, message: 'Пользователь с таким именем уже существует' });
    //     }
    // }
    // async deleteAgent(req, res){
    //     const id = req.params.id
    //     const deletedAgent = await datesService.deleteAgent(id)
    //     res.status(201).json({ success: true, deletedAgent: deletedAgent })
    // }
}

module.exports = new DatesController()