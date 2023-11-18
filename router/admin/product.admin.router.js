var express = require("express");
var router = express.Router();
const bodyParser = require('body-parser')

const {upload} = require('../../middleware/upload');

const ProductAdminController = require('../../controllers/admin/product.admin.controller')


router.get("/", ProductAdminController.getAll);
router.get("/create", ProductAdminController.getByIsbn);

router.get("/:isbn", ProductAdminController.getByIsbn);
router.post("/create",upload.single('thumb'), ProductAdminController.create);
router.post("/update",upload.single('thumb'), ProductAdminController.update);
router.post("/delete", ProductAdminController.delete);

module.exports = router;