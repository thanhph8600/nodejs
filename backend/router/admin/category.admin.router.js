var express = require("express");
var router = express.Router();

const categoryAdminControler = require("../../controllers/admin/category.admin.controller");

const { upload } = require("../../middleware/upload")


router.get('/create', categoryAdminControler.formCreate)
router.post('/create', upload.single('image'), categoryAdminControler.createCategory)
router.post('/update', upload.single('image'), categoryAdminControler.updateCategory);
router.post('/delete', categoryAdminControler.deleteCategory);

router.get('/:id', categoryAdminControler.formUpdate);
router.get('/', categoryAdminControler.index);

module.exports = router;