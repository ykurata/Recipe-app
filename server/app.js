const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");

const users = require("./routes/users");


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));