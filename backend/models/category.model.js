const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId

const categorySchema = new Schema({
    _id: {type:objectId, auto:true },
    name: {type:String, require: true},
    image: {type:String, require: true},
}, {
    versionKey: false
})

const category = mongoose.model('categories', categorySchema)
module.exports = category

