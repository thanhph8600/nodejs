const db = require('../../db')
const fs = require('fs')
const {deleteFile} = require("../../middleware/upload");
let productModel = require('../../models/product.module')
let categoryModel = require('../../models/category.module')

class ProductController{
    index(req,res){
        res.render("index",{date: getDay()})
    }
    async getAll(req,res){
        let result = await productModel.getAll().catch(console.log);
        let query = req.query.p
        if (query) {
            result = await productModel.getProductByParams(query).catch(console.log())
        }

        res.render("admin/product/list",{listProduct: result})

    }
    async getByIsbn(req,res){
        let isbn = req.params.isbn
        let result = []
        let listCategory = await categoryModel.getAll()
        if(isbn){
            result = await productModel.getProductByIsbn(isbn)
            let listCategory = await categoryModel.getAll()
            res.render("admin/product/edit",{product:result[0],category:listCategory})
        }else{
            res.render("admin/product/create",{category:listCategory})
        }

    }

    async create(req,res){
        let item = {
            name_product : req.body.name_product,
            price : Number(req.body.price),
            author: req.body.author,
            year:  Number(req.body.year),
            id_category: req.body.id_category,
            description : req.body.description,
            thumb :  req.file.filename
        }
        let newProduct = await productModel.create(item)
        let isbn = Number( String(newProduct.insertId) + Math.floor( Math.random()* 999999))
        await productModel.updateISBN(newProduct.insertId,isbn)
        res.redirect('/admin/product')
    }

    async update(req,res){
        let id = req.body.id
        let name_product = req.body.name_product
        let price = Number(req.body.price)
        let year =  Number(req.body.year)
        let author = req.body.author
        let id_category= req.body.id_category
        let description = req.body.description
        let thumb = req.body.thumb_old 

        if(req.file){
            deleteFile(thumb)
            thumb = req.file.filename
        }

        productModel.update(id,name_product,author,year,id_category, price, description, thumb)

        res.redirect('/admin/product')
    }

    async delete(req,res){
        let id = req.body.id
        let thumb = req.body.thumb

        Promise.all([
            deleteFile(thumb),
            productModel.delete(id)
        ])
        .then(() => {
            res.redirect('/admin/product')
        })
    }

    
}

module.exports = new ProductController();
