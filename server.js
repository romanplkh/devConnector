const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require("passport");

//********************************BODY PARSER */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//******************************* */SET UP DB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//****************************************** */Use Routes
app.use("/api/users/", users);
app.use("/api/profile/", profile);
app.use("/api/posts/", posts);

app.listen(port, () => console.log(`Server is running on port ${port}`));
