const CommentRepository = require('../../repositories/comment.repository')
const BaseController = require('./base.controller')

let Comment = require("../../models/comment.model");


class CommentController extends BaseController {
    constructor(){
        super(CommentRepository)
    }

    getByIdProduct =async (req, res) =>{
        const idProduct = req.query._id;
        let comment = await Comment.find({id_product:idProduct})
        .populate({
            path: 'id_user',
            select: 'image name',
          })
        res.status(200).json({comment})
    }
}

module.exports = new CommentController