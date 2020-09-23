const config = require("config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    maxlength: 64,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    maxlength: 256,
    minlength: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    fullName: Joi.string().required().min(2).max(64),
    email: Joi.string().required().min(4).max(256).email(),
    password: Joi.string().required().min(4).max(1024),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
