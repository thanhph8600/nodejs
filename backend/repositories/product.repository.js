const BaseRepository = require('./base.repository')

const Product = require('../models/product.model')

class ProductRepository extends BaseRepository {
    constructor(){
        super(Product)
    }
}

module.exports = ProductRepository