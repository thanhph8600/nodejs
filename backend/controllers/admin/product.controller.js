const ProductRepository = require('../../repositories/product.repository')
let Product = require("../../models/product.model");
let Category = require("../../models/category.model");
const { deleteFile } = require("../../middleware/upload")

class ProductController extends ProductRepository{
    constructor(){
        super(ProductRepository)
    }
  

    index = async (req, res) => {
        let listProduct = await Product.find()
        res.render("admin/index", {
            title: 'List product', 
            path: '../product/list.product.ejs', 
            
            listProduct: listProduct, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })     
    }

    formCreate = async (req, res) => {
        let listCategory = await Category.find()
        res.render("admin/index", {
            title: 'Create product', 
            path: '../product/add.product.ejs', 
            listCategory: listCategory,
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })    
    }

    createProduct = async (req, res) =>{
        try {
            let product = req.body
            product.image =  req.file.filename

            await Product.create(product)
            req.flash('success', 'Tạo thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Tạo thất bại');
        }
        res.redirect("/admin/product")
    }

    formUpdate =async (req,res)=> {
        let id = req.query.id
        let product = await Product.findById(id)
        let listCategory = await Category.find()
        res.render("admin/index", {
            title: 'Create product', 
            path: '../product/update.product.ejs', 
            product: product,
            listCategory: listCategory,
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })  
    }

    updateProduct = async (req, res) => {
        try {
            let product = req.body
            product.review_count =  0
            product.average_score =  0
            product.sale =  0
            if(req.file){
                product.image = req.file.filename
                deleteFile(req.body.image_old)
            }else{
                product.image = req.body.image_old
            }
            await Product.updateOne({_id: req.body.idProduct}, product)

            req.flash('success', 'Cập nhật thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Cập nhật thất bại');
        }
        res.redirect("/admin/product")
    }

    deleteProduct = async (req, res) => {
        try {
            let product = await Product.findById(req.body.id)
            await Product.deleteOne({_id: req.body.id})
            deleteFile(product.image)
            req.flash('success', 'Xóa thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Xóa thất bại');
        }
        res.redirect("/admin/product")
    }
}

module.exports = new ProductController