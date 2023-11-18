const db = require('../../db')
const fs = require('fs')

let category = require('../../models/category.module')

class CategoryController{
    index(req,res){
        res.render("index",{date: getDay()})
    }
    async getAll(req,res){
        let result = await category.getAll().catch(console.log);

        res.render("admin/category/list",{listCategory: result})

    }
    
    async getById(req,res){
        let id = req.params.id
        let result = []
        if(id){
            result = await category.getByID(id)
            res.render("admin/category/edit",{category:result[0]})
        }else{
            res.render("admin/category/create")
        }
    }

    async create(req,res){
        let thumb = req.file.filename
        category.create(req.body.name_category,thumb)
        res.redirect('/admin/category')
    }

    async update(req,res){
        let id = req.body.id
        let name_category = req.body.name_category
        let thumb =  req.body.thumb_old 
        console.log(req.file);

        if(req.file){
            // unlink(thumb)
            thumb = req.file.filename
        }

        category.update(id, name_category,thumb)

        res.redirect('/admin/category')
    }

    async delete(req,res){
        let id = req.body.id
        await category.delete(id)
        res.redirect('/admin/category')
    }
}


module.exports = new CategoryController