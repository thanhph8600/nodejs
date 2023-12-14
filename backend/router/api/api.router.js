var express = require("express");
var router = express.Router();

const userApiRouter = require('./user.api.router')
const categoryApiRouter = require('./category.api.router')
const productApiRouter = require('./product.api.router')
const commentApiRouter = require('./comment.api.router')

router.use("/user", userApiRouter);
router.use("/category", categoryApiRouter);
router.use("/product", productApiRouter);
router.use("/comment", commentApiRouter);

router.use("/", (req,res) =>{
    res.redirect('/api/user')
});

module.exports = router;