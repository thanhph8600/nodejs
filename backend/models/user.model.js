const mongoose = require('mongoose')
var bcrypt = require("bcryptjs");
const Schema = mongoose.Schema
const objectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
    _id: {type:objectId, auto:true },
    name: {type:String, require: true},
    email: {type:String, require: true, unique:true},
    phone: {type:String, require: true},
    password: {type:String, require: true},
    image: {type:String, require: true, default:'null-avt.jpg'},
    role: {type:Number, require: true, default: 1},
    isBanned: {type:String},
}, {
    versionKey: false
})

// Use pre middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
  
      // Replace the plaintext password with the hashed one
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
});

const user = mongoose.model('users', userSchema)
module.exports = user

