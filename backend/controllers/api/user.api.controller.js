const UserRepository = require('../../repositories/user.repository')
const BaseController = require('./base.controller')

let User = require("../../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class UserController extends BaseController {
    constructor(){
        super(UserRepository)
    }

    register = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user == null){

            let body = req.body

            this.repo.create(body).then(data => {
                return this.created(res, data)
            }).catch(err => {
                return this.internalServerError(res, err)
            })

        }else {
            return res.status(500).json({message: 'Email tồn tại'})
        }
    }

    login = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user == null){
            return res.status(404).json({message: 'Mật khẩu hoặc email chưa đúng'})

        }else {

            let checkPass = bcrypt.compareSync(req.body.password, user.password);
            if(user.isBanned){
                return res.status(500).json({message: 'Tài khoản của bạn đã bị khóa'})
            }
            if(checkPass){
                let payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone,
                    role: user.role,
                    isBanned: user.isBanned,
                };
                
                let token = jwt.sign(payload, "FptPolyTechnic", { expiresIn: 7200 });
                return res.status(200).json({ token: token });

            }else {
                return res.status(404).json({message: 'Mật khẩu hoặc email chưa đúng'})
            }

        }
    }

    updateUser =async (req, res) =>{
        const body = req.body
        if(req.file){
            body.image = req.file.filename
        }
        let user = await User.findOne({_id:body._id})
        body.password = user.password
        body.role = user.role
        console.log(body);
        this.repo.update(body).then(data => {
            return this.ok(res,data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }

    getByToken = async (req, res) => {
        var decoded = jwt.verify(req.headers.token, "FptPolyTechnic");

        return res.status(200).json({ user: decoded });
    }
}

module.exports = new UserController