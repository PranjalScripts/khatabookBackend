const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the ClientUser schema
const clientUserSchema = new Schema(
  {// Reference to the User model (merchant)
    user: {
      type: Schema.Types.ObjectId,
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
      match: [/^\d{10}$/, "Please enter a valid mobile number"], // Example for validation (10 digits)
    },
    // Client user's email address
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    // Store bookId and userId separately for easy querying
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const ClientUser = mongoose.model("ClientUser", clientUserSchema);
module.exports = ClientUser;
