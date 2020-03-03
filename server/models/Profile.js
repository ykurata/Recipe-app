const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }, 
    description: {
      type: String,
    },
    photo: {
      type: String,
    }
  },
  {
    timestamps: { createdAt: true }
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);