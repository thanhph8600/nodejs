const CategoryRepository = require('../../repositories/category.repository')
const BaseController = require('./base.controller')

let Category = require("../../models/category.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class CategoryController extends BaseController {
    constructor(){
        super(CategoryRepository)
    }
}

module.exports = new CategoryController