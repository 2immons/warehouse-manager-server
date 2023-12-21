const productService = require('../services/product.service');
const bodyParser = require('body-parser');

class ProductController{
    async createProduct(req, res){
        const {name, description} = req.body
        const product = await productService.createProduct(name, description)

        if (product != false) {
            res.status(201).json({ success: true, product: product });
        }
    }

    async getProducts(req, res){
        const products = await productService.getProducts()
        res.status(201).json({ success: true, products: products });
    }

    async getProductByID(req, res){
        const id = req.params.id
        const product = await productService.getProductByID(id)
        res.status(201).json({ success: true, product: product });
    }

    async updateProducts(req, res){
        const updatedProducts = []
        const updatedProductsData = req.body;
        for (const updatedProduct of updatedProductsData) {
            const { name, produced, shipped, ready_to_ship, id } = updatedProduct;
        
            const updatedProductsItem = await productService.updateProduct(name, produced, shipped, ready_to_ship, id)
        
            updatedProducts.push(updatedProductsItem);
          }
        res.status(201).json({ success: true, updatedProducts: updatedProducts });
    }

    async updateProduct(req, res){
        const { name, produced, shipped, ready_to_ship, id } = req.body;
        const updatedProduct = await productService.updateProduct(name, produced, shipped, ready_to_ship, id)
        res.status(201).json({ success: true, updatedProduct: updatedProduct });
    }
    async deleteProduct(req, res){
        const id = req.params.id
        const deletedProduct = await productService.deleteProduct(id)
        res.status(201).json({ success: true, deletedProduct: deletedProduct });
    }
    async getdocument (req, res) {
        const document = "D:/GitHub Repositories/warehouse-manager/production-management/src/documents/UPD.docx"
        res.sendFile(document)
    }
}

module.exports = new ProductController()