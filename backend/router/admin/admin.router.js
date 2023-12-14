var express = require("express");
var router = express.Router();
const userAdminControler = require("../../controllers/admin/user.admin.controller");
const { auth, apiAuth } = require('../../middleware/auth');

const UserRouter = require('./user.admin.router')
const CategoryRouter = require('./category.admin.router')
const ProductRouter = require('./product.admin.router')
const ComemntRouter = require('./comment.router')

router.get('/login', userAdminControler.login)
router.post('/login', userAdminControler.loginPost)
router.post('/login-token', userAdminControler.loginToken)

router.use('/user' ,auth,  UserRouter)
router.use('/category' ,auth, CategoryRouter)
router.use('/product' ,auth,  ProductRouter)
router.use('/comment' ,auth,  ComemntRouter)


router.get("/", (req, res) =>{
    res.redirect("/admin/user")
});

module.exports = router;