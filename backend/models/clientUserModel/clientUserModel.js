const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the ClientUser schema
const clientUserSchema = new Schema(
  {
    // Reference to the User model (merchant)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Client user's name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Client user's mobile number
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // Client user's email address
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
   
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const ClientUser = mongoose.model("ClientUser", clientUserSchema);
module.exports = ClientUser;
