var express = require("express");
var router = express.Router();

const commentAdminControler = require("../../controllers/admin/comment.admin.controller");


router.get('/detail', commentAdminControler.detailComment);
router.get('/', commentAdminControler.index);

module.exports = router;