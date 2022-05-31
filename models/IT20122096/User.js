const config = require("config");
const Joi = require("joi");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userRole: {type: String,required: true,},
  userId: {type: String,},
  researchField: {type: String,minlength: 5,maxlength: 225,},
  name: {type: String,required: true,minlength: 5,maxlength: 50,},
  email: {type: String,required: true,minlength: 5,maxlength: 50,unique: true,},
  password: {type: String,required: true,minlength: 5,maxlength: 255,},
  isAdmin:{type:Boolean,default:false}
});

//Jwt Token generating Method
userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      _id: this.id,
      userRole: this.userRole,
      userId: this.userId,
      email: this.email,
      name: this.name,
      isAdmin:this.isAdmin
    },config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.models.User || mongoose.model("User", userSchema);

//User Registation Validate 
function validateUser(user) {
  const schema = Joi.object({
    userRole: Joi.required(),
    userId: Joi.string(),
    researchField:Joi.string().min(5).max(255),
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
//User Update validate
function validateUpdateUser(user) {
  const schema = Joi.object({
    userId: Joi.string(),
    researchField: Joi.string().min(5).max(255),
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });
  return schema.validate(user);
}
//User login validate
function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
exports.validateUpdateUser = validateUpdateUser;
