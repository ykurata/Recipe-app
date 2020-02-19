const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }, 
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String,
    }
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);