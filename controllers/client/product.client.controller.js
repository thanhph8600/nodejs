const db = require('../../db')
const fs = require('fs')

let productModel = require('../../models/product.module')
let categoryModel = require('../../models/category.module')

class ClientController{

    async render(req,res){
        let listProduct = await productModel.getAll().catch(console.log);
        let listCategory = await categoryModel.getAll().catch(console.log);
        let id_category = req.query.idCategory
        let search = req.query.search
        if (id_category) {
            listProduct = await productModel.getProductByIdCategory(id_category).catch(console.log())
            let category = await categoryModel.getByID(id_category).catch(console.log())
            res.render("client/listProduct",{listProduct: listProduct, listCategory:listCategory,name_category: category[0].name_category})
        }else if(search){
            listProduct = await productModel.getProductByParams(search).catch(console.log())
            res.render("client/listProduct",{listProduct: listProduct, listCategory:listCategory,name_category: ''})
        }else{
            res.render("client/listProduct",{listProduct: listProduct, listCategory:listCategory,name_category: ''})
        }

    }

    async renderByIsbn(req,res){
        let isbn = req.params.isbn
        let product = await productModel.getProductByIsbn(isbn).catch(console.log())
        res.render("client/detailProduct",{product: product[0]})
    }
}


module.exports = new ClientController