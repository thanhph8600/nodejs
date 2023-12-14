const UserRepository = require('../../repositories/user.repository')
let User = require("../../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const { deleteFile } = require("../../middleware/upload")

class UserController extends UserRepository{
    constructor(){
        super(UserRepository)
    }

    index = async (req, res) => {
        let listUser = await User.find({ isBanned: { $exists: false }})
        res.render("admin/index", {
            title: 'List User', 
            path: '../user/list.user.ejs', 
            listUser: listUser, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')})     
    }

    login = (req, res) =>{
        res.render("admin/login", { message: "" })
    }

    loginPost = async (req, res) =>{

        const user = await User.findOne( { email: req.body.email });

        if (user == null) {
            res.render("admin/login", { message: "Email hoặc mật khẩu chưa chính sát" });
        } else {
            let check = bcrypt.compareSync(req.body.password, user.password);
            if (!check) {
                res.render("admin/login", { message: "Email hoặc mật khẩu chưa chính sát" });
            } else {
                
                if (user.role == 0) {
                    let payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        phone:user.phone
                    };
                
                    let token = jwt.sign(payload, "FptPolyTechnic", { expiresIn: 3600 });
    
                    // req.session.logined = true
                    req.session.payload = payload
                    res.redirect("/admin/user");
                }
                res.render("admin/login", { message: "Email hoặc mật khẩu chưa chính sát" });
            }
        }
    }

    loginToken = async (req, res) =>{
        try {
            var decoded = jwt.verify(req.headers.token, "FptPolyTechnic");
            const { iat, exp, ...user } = decoded;
            jwt.sign(user, "FptPolyTechnic", { expiresIn: 3600 });
            req.session.payload = user
            res.redirect("http://localhost:3000/admin");
        } catch (error) {
            console.log(error);
            res.redirect("http://localhost:3000/admin/login");
        }
    }

    formCreate = (req, res) =>{
        res.render("admin/index", {
            title: 'Create User', 
            path: '../user/add.user.ejs' , 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')})  
    }

    createUser =async (req, res) =>{
        try {
            let user = req.body
            user.image = 'null-avt.jpg'
            if(req.file) {
                user.image = req.file.filename
            }
            
            await User.create(user)
            req.flash('success', 'Tạo thành công');4
            res.redirect("/admin/user")
            
        } catch (error) {
            console.log(error);
            req.flash('error', 'Tạo tài Thất bại');
            res.redirect("/admin/user")
        }


    }

    formUpdate = async (req, res) =>{
        let user = await User.findById(req.query.id)
        user.id = req.query.id
        res.render("admin/index", {
            title: 'Update User', 
            path: '../user/update.user.ejs',
            user: user, 
            successMessage: req.flash('success'), 
            errorMessage: req.flash('error')})  
    }

    updateUser =async (req, res) =>{
        try {
            let user = req.body
            let idUser = user.id
            let oldUser = await User.findById(idUser)

            if(req.file){ 
                user.image = req.file.filename
                if(user.old_image != 'null-avt.jpg') {
                    await deleteFile(user.old_image)
                }
            }else{
                user.image = user.old_image
            }
            delete user.old_image 
            delete user.id 

            if(user.password != oldUser.password){
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword
            }
            await User.updateOne({ _id: idUser }, user);
            res.redirect("/admin/user");
        } catch (error) {
            console.log(error);
            res.redirect("/admin/user");
        }
    }

    banUser = async (req, res) =>{
        let id = req.body.idUser
        let isBanned = req.body.isBanned
        
        let user = await User.findById(id)
        user.isBanned = isBanned
        await User.updateOne({ _id: id }, user)
        res.redirect("/admin/user");
    }
}

module.exports = new UserController