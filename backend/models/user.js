const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.matchedPasswords = async function (enteredPW) {
  return await bcrypt.compare(enteredPW, this.password);
};

schema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      full_name: this.full_name,
    },
    process.env.JWT_SECRET
  );
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", schema);

module.exports = User;
