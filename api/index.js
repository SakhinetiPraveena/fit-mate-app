const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/message");

mongoose
  .connect("mongodb+srv://sakhinetipraveena:sakhinetipraveena@cluster0.qwr8rbb.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB"); 
  });

  app.listen(port, () => {
    console.log("Server is running on");
  });
//endpoint to check if registration  email already esits
app.post("/checkEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }
    else{
      return res.status(200).json({ message: "Email not already registered" });
    }
  } catch (error) {
    console.log("Error checking email of the user", error);
    res.status(500).json({ message: "Checking email failed" });
  }
});
//endpoint to register a user to the backend
app.post("/register", async (req, res) => {
  try {
    const { name, email, password,gender,goal,age,height,weight,bio} = req.body;

    //check if the email is already registered
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   console.log("Email already registered");
    //   return res.status(400).json({ message: "Email already registered" });
    // }

    //create a new User
    const newUser = new User({
      name,
      email,
      password,
      gender, 
      goal,
      age,
      height,
      weight,
      bio
    });

    //generate the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res
      .status(200)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});
const sendVerificationEmail = async (email, verificationToken) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sakhinetipraveena@gmail.com",
      pass: "zmpeqidzpqirjteu",
    },
  });

  const mailOptions = {
    from: "matchmake.com",
    to: email,
    subject: "Email verification",
    text: `Please click on the following link to verify your email : http://localhost:3000/verify/${verificationToken}`,
  };

  //send the mail
  try {
    await transpoter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the verification email");
  }
};

//verify the user
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified Sucesfully" });
  } catch (error) {
    console.log("errror", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists already
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check in password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalide password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "login failed" });
  }
});

//fetch users data
app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
});

//endpoint to fetch all the profiles for a particular user
app.get("/profiles", async (req, res) => {
  const { userId,gender} = req.query;

  try {
    // let filter = { gender: gender === "male" ? "male" : "female" }; // For gender filtering
    let filter = {};
    const currentUser = await User.findById(userId)
      .populate("following", "_id");

    // Extract IDs of friends
    const friendIds = currentUser.following.map((friend) => friend._id);

    const profiles = await User.find(filter)
      .where("_id")
      .nin([userId, ...friendIds]);

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profiles", error });
  }
});

//endpoint to follow a user
app.post("/follow", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { followers: currentUserId },
    });
    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { following: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//endpoint to fetch user followers
app.get("/users/:userId/followers", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followerIds = user.followers;

    const followers = await User.find({ _id: { $in: followerIds } });

    res.status(200).json({ followers });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
});

//endpoint to fetch user following
app.get("/users/:userId/following", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingIds = user.following;

    const following = await User.find({ _id: { $in: followingIds } });

    res.status(200).json({ following });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
});

//Socket IO connection
io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      console.log("data", data);

      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      //emit the message to the receiver
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.log("Error handling the messages");
    }
    socket.on("disconnet", () => {
      console.log("user disconnected");
    });
  });
});

http.listen(8000, () => {
  console.log("Socket.IO server running on port 8000");
});

app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log(senderId);
    console.log(receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages", error });
  }
});


//endpoint to delete the messages;

app.post("/delete",async(req,res) => {
    try{
        const {messages} = req.body;

        if(!Array.isArray(messages) || messages.length == 0){
            return res.status(400).json({message:"Invalid request body"})
        };

        for(const messageId of messages){
            await Chat.findByIdAndDelete(messageId);
        }

        res.status(200).json({message:"Messages delted successfully!"})
    } catch(error){
        res.status(500).json({message:"Internal server error",error})
    }
})