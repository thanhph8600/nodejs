const db = require('../../db')
const fs = require('fs')

let productModel = require('../../models/product.module')
let categoryModel = require('../../models/category.module')

class ClientController{

    async renderHome(req,res){
        let product = await productModel.getAll().catch(console.log);
        let category = await categoryModel.getAll().catch(console.log);
        let query = req.query.p
        if (query) {
            result = await productModel.getProductByParams(query).catch(console.log())
        }

        res.render("client/home",{listProduct: product,listCategory:category})
    }
}


module.exports = new ClientController