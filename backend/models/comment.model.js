const mongoose = require('mongoose')
const { format } = require('date-fns');
const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId

const commentSchema = new Schema({
    _id: {type:objectId, auto:true },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true},
    id_product: {type:String, require: true},
    content: {type:String, require: true},
    star: {type:Number},
    createdAt: { type: Date, default: format(new Date(), 'dd-MM-yyyy')},
}, {
    versionKey: false
})


const comment = mongoose.model('comments', commentSchema)
module.exports = comment

