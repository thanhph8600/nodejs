const BaseRepository = require('./base.repository')

const Comment = require('../models/comment.model')

class CommentRepository extends BaseRepository {
    constructor(){
        super(Comment)
    }
}

module.exports = CommentRepository