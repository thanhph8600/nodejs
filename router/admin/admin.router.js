var express = require("express");
var router = express.Router();
const ProductAdminController = require('../../controllers/admin/product.admin.controller')
const productAdmin = require('./product.admin.router')
const categoryAdmin = require('./category.admin.router')


router.use("/product", productAdmin);
router.use("/category", categoryAdmin);
router.use("/", ProductAdminController.getAll);

module.exports = router;