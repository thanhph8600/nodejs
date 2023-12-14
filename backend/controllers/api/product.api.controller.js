const ProductRepository = require('../../repositories/product.repository')
const BaseController = require('./base.controller')

let Product = require("../../models/product.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class ProductController extends BaseController {
    constructor(){
        super(ProductRepository)
    }

    getByQuery =async (req, res) => {
        try {
            let idCategory = req.query.category_id
            let query = req.query.search
            let isbn = req.query.isbn
            var data 
            if(idCategory){
                data = await Product.find({category_id: idCategory})
            }
            if(query){
                data = await Product.find({
                    $or:[
                        { name: { $regex: new RegExp(query, 'i') } },
                        { author: { $regex: new RegExp(query, 'i') } },
                        { isbn: { $regex: new RegExp(query, 'i') } },
                    ]
                })
            }
            if(isbn){
                data = await Product.findOne({ isbn: isbn })
                .populate('category_id', 'name')
                .exec()

            }
            if(!data || data.length == 0){
                return res.status(404).json('Trống')
            }
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(404).json(error)
        }
    }

    getByIsbn = (req, res) =>{

    }
}

module.exports = new ProductController