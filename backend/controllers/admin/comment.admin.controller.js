const CommentRepository = require('../../repositories/comment.repository')
const Product = require("../../models/product.model")
const Comment = require('../../models/comment.model');
const User = require('../../models/user.model');

const { deleteFile } = require("../../middleware/upload");

class ComemntController extends CommentRepository{
    constructor(){
        super(CommentRepository)
    }
    index = async (req, res) => {
        let listProduct = await Product.find({ review_count: { $gt: 0 } })
        res.render("admin/index", {
            title: 'List of products with comments', 
            path: '../comment/list.comment.ejs', 
            
            listProduct: listProduct, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })     
    }

    detailComment =  async (req, res) => {
        let id = req.query.id
        let listComment = await Comment.find({id_product:id})
            .populate({
                path: 'id_user',
                select: 'image name',
            })
        let product = await Product.findOne({_id:id})
        res.render("admin/index", {
            title: 'List comment by ' + product.name, 
            path: '../comment/list.detailComment.ejs', 
            
            listComment: listComment, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')
        })     
    }
}

module.exports = new ComemntController