var express = require("express");
var router = express.Router();

const userAdminControler = require("../../controllers/admin/user.admin.controller");
const {upload } = require("../../middleware/upload")


router.get('/create',userAdminControler.formCreate)
router.post('/create', upload.single('image'), userAdminControler.createUser)

router.post('/update', upload.single('image'), userAdminControler.updateUser)
router.post('/ban-user', userAdminControler.banUser)

router.get('/:id', userAdminControler.formUpdate)
router.get('/', userAdminControler.index);

module.exports = router;