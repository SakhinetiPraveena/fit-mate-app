const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  goal: {
    type: String,
    enum: ["Gain Muscle", "Lose Weight", "Stay Fit"],
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  age: { 
    type: String,
  },
  bio: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


const User = mongoose.model("User",userSchema);

module.exports = User