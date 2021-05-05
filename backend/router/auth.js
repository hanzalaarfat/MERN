const express = require("express");
const router = express.Router();

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
module.exports = router;
