var express = require("express");
var router = express.Router();


const productClientController = require('../../controllers/client/product.client.controller')

router.get("/:isbn", productClientController.renderByIsbn);
router.get("/", productClientController.render);


module.exports = router;