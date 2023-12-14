var express = require("express");
var router = express.Router();

const ProductController = require('../../controllers/api/product.api.controller')

router.post("/update-avg", ProductController.update)
router.get("/:query",ProductController.getByQuery)
router.get("/:isbn",ProductController.getByIsbn)
router.get("/" , ProductController.getAll);

module.exports = router;