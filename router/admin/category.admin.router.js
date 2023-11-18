var express = require("express");
var router = express.Router();
const bodyParser = require('body-parser')

const {upload} = require('../../middleware/upload');

const CategoryController = require('../../controllers/admin/category.admin.controller')

router.get("/", CategoryController.getAll);
router.get("/create", CategoryController.getById);
router.get("/:id", CategoryController.getById);
router.post("/create",upload.single('thumb'), CategoryController.create);
router.post("/update",upload.single('thumb'), CategoryController.update);
router.post("/delete", CategoryController.delete);

module.exports = router;