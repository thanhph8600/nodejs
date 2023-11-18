var express = require("express");
var router = express.Router();

const ProductController = require('../../controllers/client/product.client.controller')
const ClientController = require('../../controllers/client/client.controller')
const productClientRouter = require('./product.client.router')


router.use("/product", productClientRouter);

router.use("/", ClientController.renderHome);

module.exports = router;