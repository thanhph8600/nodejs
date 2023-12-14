const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId

const productSchema = new Schema({
    _id: {type:objectId, auto:true },
    name: {type:String, require: true},
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        require: true},
    price: {type:Number, require: true},
    sale:{type:Number, require: true, default: 0},
    isbn: {type:String, require: true, unique:true},
    author: {type:String, require: true},
    year: {type:Number, require: true},
    info: {type:String, require: true},
    review_count: {type:Number, require: true, default: 0},
    average_score: {type:Number, require: true, default: 0},
    image: {type:String, require: true},
}, {
    versionKey: false
})

const product = mongoose.model('products', productSchema)
module.exports = product

