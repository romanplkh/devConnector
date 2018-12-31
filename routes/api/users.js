const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load USer model
const User = require("../../models/User");

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

//@route    GET api/users/register
//@desc     Register users
//@access   Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
//@desc     Login users/REturning JWToken
//@access   Public

router.post("/login", (req, res) => {
  const emailInputed = req.body.email;
  const passwordInputed = req.body.password;

  //Find user by email

  User.findOne({ email: emailInputed }).then(user => {
    //Check USer
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //Check Password
    bcrypt.compare(passwordInputed, user.password).then(isValid => {
      if (isValid) {
        //TODO==>>>> Generate token...
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create jwt-payload
        //Sign Token
        jwt.sign(
          payload,
          keys.tokenSecret,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
