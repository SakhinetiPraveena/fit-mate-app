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
  profilePicture: {
    type: String,
    default:"https://imgs.search.brave.com/7_-25qcHnU9PLXYYiiK-IwkQx93yFpp__txSD1are3s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw"
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
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});


const User = mongoose.model("User", userSchema);

module.exports = User