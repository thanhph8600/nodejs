var express = require("express");
var router = express.Router();

const CategoryController = require('../../controllers/api/category.api.controller')

router.get("/" , CategoryController.getAll);

module.exports = router;