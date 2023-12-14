var express = require("express");
var router = express.Router();

const productAdminControler = require("../../controllers/admin/product.controller");

const { upload } = require("../../middleware/upload")


router.get('/create', productAdminControler.formCreate)
router.post('/create', upload.single('image'), productAdminControler.createProduct)
router.post('/update', upload.single('image'), productAdminControler.updateProduct);
router.post('/delete', productAdminControler.deleteProduct);

router.get('/:id', productAdminControler.formUpdate);

router.get('/', productAdminControler.index);

module.exports = router;