const CategoryRepository = require('../../repositories/category.repository')
let Category = require("../../models/category.model");
const { deleteFile } = require("../../middleware/upload")

class CategoryController extends CategoryRepository{
    constructor(){
        super(CategoryRepository)
    }
  

    index = async (req, res) => {
        let listCategory = await Category.find()
        res.render("admin/index", {
            title: 'List category', 
            path: '../category/list.category.ejs', 
            listCategory: listCategory, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })     
    }

    formCreate = (req, res) => {
        res.render("admin/index", {
            title: 'Create category', 
            path: '../category/add.category.ejs', 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })    
    }

    createCategory = async (req, res) =>{
        try {
            let category = {
                name:req.body.name,
                image: req.file.filename
            }
            await Category.create(category)
            req.flash('success', 'Tạo thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Tạo thất bại');
        }
        res.redirect("/admin/category")
    }

    formUpdate =async (req,res)=> {
        let id = req.query.id
        let category = await Category.findById(id)
        res.render("admin/index", {
            title: 'Create category', 
            path: '../category/update.category.ejs', 
            category: category,
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })  
    }

    updateCategory = async (req, res) => {
        try {
            let category = {
                name: req.body.name
            }
            if(req.file){
                category.image = req.file.filename
                deleteFile(req.body.image_old)
            }else{
                category.image = req.body.image_old
            }
            console.log(category);
            await Category.updateOne({_id: req.body.idCategory}, category)

            req.flash('success', 'Cập nhật thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Cập nhật thất bại');
        }
        res.redirect("/admin/category")
    }

    deleteCategory = async (req, res) => {
        try {
            let category = await Category.findById(req.body.id)
            await Category.deleteOne({_id: req.body.id})
            deleteFile(category.image)
            req.flash('success', 'Xóa thành công');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Xóa thất bại');
        }
        res.redirect("/admin/category")
    }
}

module.exports = new CategoryController