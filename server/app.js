const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const users = require("./routes/users");
const profile = require("./routes/profile");
const recipes = require("./routes/recipes");

app.use(logger("dev"));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

// Set up mondoDB connection
mongoose.connect("mongodb://localhost:27017/recipe-api", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", function(err){
  console.error("connection error:", err);
});

db.once("open", function(){
  console.log("db connection successful");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);
app.use("/profile", profile);
app.use("/recipes", recipes);

// Set up cors
app.use(cors());


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));