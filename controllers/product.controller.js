const db = require('../db')
const fs = require('fs')

let productModel = require('../models/product.module')

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
        res.render("products",{listProduct: result})

    }
    async getById(req,res){
        let id = req.params.id
        let result = await productModel.getProductByID(id)
        res.render("detaiProduct",{product:result[0]})
    }

    formCreate(req,res){
        res.render("addProduct")
    }

    create(req,res){
        let item = {
            name_product: req.body.nameProduct,
            price: Number(req.body.price),
            description: req.body.description,
            thumb: req.file.filename
        }

        productModel.create(item)
        res.redirect('/products')

    }
    delete(req,res){
        fs.unlink(`./public/uploads/${req.body.thumb}`, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log('File deleted successfully');
            }
        })
        productModel.delete(req.body.id)
        res.redirect('/products')

    }
}

function getDay(){
    var date = new Date()
    var currentDay = date.getDay()
    var day = ''
    switch (currentDay) {
        case 0:
            day = 'Chủ Nhật'
            break;
        case 1:
            day = 'Thứ Hai'
            break;
        case 2:
            day = 'Thứ Ba'
            break;
        case 3:
            day = 'Thứ Tư'
            break;
        case 4:
            day = 'Thứ Nam'
            break;
        case 5:
            day = 'Thứ Sáu'
            break;
        case 6:
            day = 'Thứ Bảy'
            break;
        default:
            break;
    }
    return day
}

module.exports = new ProductController