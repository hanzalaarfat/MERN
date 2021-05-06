const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/con");
const User = require("../model/user");

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ err: "plz filled properly" });
  }
  //////////////////////// register using promise prommise/////////////////////
  // User.findOne({ email: email })
  //   .then((userExist) => {
  //     if (userExist) {
  //       console.log(userExist);
  //       return res.status(422).json({ err: "user alredy exist" });
  //     }
  //     const user = new User({
  //       name,
  //       email,
  //       phone,
  //       work,
  //       password,
  //       cpassword,
  //     });
  //     user
  //       .save()
  //       .then(() => {
  //         res.status(201).json({ message: "user resgister successfuly" });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: "Faild to register" });
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  ///////////////////////////////// async await or  /////////
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log(userExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    /// pre save password hashing in user schema
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "user resgister successfuly" });
    } else {
      res.status(500).json({ error: "Faild to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signina", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ err: "plz fill data properly" });
    }
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), /// expiry token time 1 month
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials : password " });
      } else {
        res.json({ message: "signin successful" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials : email" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
