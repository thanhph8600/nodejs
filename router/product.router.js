var express = require("express");
var router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer')
router.use(bodyParser.urlencoded())
let ProductController = require("../controllers/product.controller");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname )
    }
})
var upload = multer({ storage: storage })




router.get("/", ProductController.index);
router.get("/products", ProductController.getAll);
router.get('/page-crate-product',ProductController.formCreate)
router.post('/addProduct',upload.single('thumb'),ProductController.create)
router.get('/product/:id',ProductController.getById)

router.post('/delete',ProductController.delete)
module.exports = router;