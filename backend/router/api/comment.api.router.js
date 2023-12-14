var express = require("express");
var router = express.Router();

const CommentController = require('../../controllers/api/comment.api.controller')

router.post("/create" , CommentController.add);
router.get("/:id-product" , CommentController.getByIdProduct);
router.get("/" , CommentController.getAll);

module.exports = router;