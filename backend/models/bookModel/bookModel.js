// transactionBookModel.js
const mongoose = require("mongoose");

const transactionBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookname: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionBook = mongoose.model(
  "TransactionBook",
  transactionBookSchema
);

module.exports = TransactionBook;
